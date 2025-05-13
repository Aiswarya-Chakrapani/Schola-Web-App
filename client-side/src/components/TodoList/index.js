import { Component } from "react";
import Cookies from 'js-cookie'
import Navbar from '../Navbar';
import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './index.css';

import {
  TodoListMainPage,
  TodoListPageBody,
  TodoMainH,
  TodoMainPageHeader,
  AddTaskBtn,
  HrLineEdit,
  TasksList,
  TasksListNumber,
  TaskBtnList,
  TaskMidVerticalLine,
  TasksListContainer,
} from './styledComponents.js';

import TodoTaskItem from '../TodoTaskItem';

class TodoList extends Component {
  state = {
    newTask: {
      taskHeading: '',
      taskDescription: '',
      check: false,
      dateTime: '', 
    },
    todoListArr: [
      // { 
      //   id: uuidv4(),
      //   taskHeading: 'Aditya',
      //   taskDescription: 'Aditya is a very good boy...',
      //   check: false,
      //   dateTime: '2024-09-08'
      // },
      // {
      //   id: uuidv4(),
      //   taskHeading: 'Dhanvi',
      //   taskDescription: 'Dhanvi is a very good girl',
      //   check: true,
      //   dateTime: '2024-09-30'
      // }
    ],
    selectedTab: 'all',
    isModalOpen: false,
    errorMessage: '', 
  };

  componentDidMount () {
    this.getAllTasksApi()
  }

  getAllTasksApi = async () => {
    const username = Cookies.get('username')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `http://localhost:3333/todolist/tasks/${username}/`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
    }
    const data = await fetch(apiUrl,options)
    const response = await data.json()
    const allTasksArr = response.map(each => ({
      id: each.taskId,
      taskHeading: each.taskTitle,
      taskDescription: each.taskDescription,
      check: each.isCompleted,
      dateTime: each.deadline,
    }));
    this.setState({
      todoListArr: allTasksArr,
    })    
  }

  handleTaskTitleChange = event => {
    this.setState(prevState => ({
      newTask: {
        ...prevState.newTask,
        taskHeading: event.target.value,
      },
      errorMessage: '' 
    }));
  };

  handleTaskDescriptionChange = event => {
    this.setState(prevState => ({
      newTask: {
        ...prevState.newTask,
        taskDescription: event.target.value,
      },
      errorMessage: '' 
    }));
  };

  handleDateChange = event => {
    this.setState(prevState => ({
      newTask: {
        ...prevState.newTask,
        dateTime: event.target.value,
      },
      errorMessage: '' 
    }));
  };

  handleSaveTask = async () => {
    const { newTask, todoListArr } = this.state;
    const { taskHeading, taskDescription, dateTime } = newTask;

    const username = Cookies.get('username')
    const id = uuidv4()
    const taskObj = {
      ...newTask,
      id,
      username,
    };

    if (taskHeading.trim() === '' || taskDescription.trim() === '' || dateTime.trim() === '') {
      this.setState({ errorMessage: '*Please fill out all the required fields.' });
      return;
    }
    const jwtToken = Cookies.get('jwt_token')

    try {
      const apiUrl = 'http://localhost:3333/todolist/addtask/'

      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(taskObj),
      }
      const response = await fetch(apiUrl,options)
      console.log(response)
      if(response.ok === true) {
        this.setState({
          todoListArr: [...todoListArr, { ...newTask, id }],
          isModalOpen: false,  
          newTask: {           
            taskHeading: '',
            taskDescription: '',
            check: false,
            dateTime: '',
          },
          errorMessage: '',  
        });
      }
    } catch(error) {
      alert(error)
    } 
  };

  changeSelectAllTabState = () => {
    this.setState({ selectedTab: 'all' });
  };

  changeSelectClosedTabState = () => {
    this.setState({ selectedTab: 'closed' });
  };

  changeSelectOpenTabState = () => {
    this.setState({ selectedTab: 'open' });
  };

  toggleCheck = async taskId => {
    const jwtToken = Cookies.get('jwt_token')
    const {todoListArr} = this.state
    const selectedTask = todoListArr.filter(each => each.id === taskId)
    const obj = {
      check: !selectedTask[0].check,
    }
    this.setState(prevState => ({
      todoListArr: prevState.todoListArr.map(each => 
        each.id === taskId ? { ...each, check: !each.check } : each
      )
    }));
    const apiUrl = `http://localhost:3333/todolist/updatetaskcheck/${taskId}`
    console.log(selectedTask)
    const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(obj),
    }
    const response = await fetch(apiUrl,options)
    if(response.ok === true) {
      console.log('Task Updated')
    } else {
      console.error('Task not updated')
    }
  };

  deleteTaskFunc = async taskId => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState(prevState => ({
      todoListArr: prevState.todoListArr.filter(each => each.id !== taskId)
    }));
    const apiUrl = `http://localhost:3333/todolist/${taskId}`
    const options = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl,options)
      if(response.ok === true) {
        console.log('Task Deleted')
      } else {
        console.error('Task not deleted')
      }
    } catch (error) {
      alert(error)
    }
  };

  handleModalShow = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false, errorMessage: '' }); 
  };

  onAddTask = () => {
    this.handleModalShow();
  };

  render() {
    const { todoListArr, selectedTab, isModalOpen, newTask, errorMessage } = this.state;
    const openTasks = todoListArr.filter(each => !each.check);  
    const closedTasks = todoListArr.filter(each => each.check); 

    let outputArr = [];

    switch(selectedTab) {
      case 'all':
        outputArr = todoListArr;
        break;
      case 'closed':
        outputArr = closedTasks;
        break;
      case 'open':
        outputArr = openTasks;
        break;
      default:
        return;
    }

    const today = new Date().toISOString().split('T')[0];

    return (
      <TodoListMainPage className={isModalOpen ? 'blur-filter' : ''}>
        <Navbar selectedMenu='todo' />
        <TodoListPageBody>
          <TodoMainPageHeader>
            <TodoMainH>My Tasks</TodoMainH>
            <AddTaskBtn onClick={this.onAddTask}> 
              <FaPlus style={{ marginRight: '10px' }} /> Add 
            </AddTaskBtn>
          </TodoMainPageHeader>
          <HrLineEdit />
          <TaskBtnList>
            <TasksList selectedTab={selectedTab === 'all'} onClick={this.changeSelectAllTabState}>
              All 
              <TasksListNumber selectedTab={selectedTab === 'all'}>{todoListArr.length}</TasksListNumber>
            </TasksList>
            <TaskMidVerticalLine />
            <TasksList selectedTab={selectedTab === 'closed'} onClick={this.changeSelectClosedTabState}>
              Closed 
              <TasksListNumber selectedTab={selectedTab === 'closed'}>{closedTasks.length}</TasksListNumber>
            </TasksList>
            <TasksList selectedTab={selectedTab === 'open'} onClick={this.changeSelectOpenTabState}>
              Open 
              <TasksListNumber selectedTab={selectedTab === 'open'}>{openTasks.length}</TasksListNumber>
            </TasksList>
          </TaskBtnList>
          <TasksListContainer>
            {outputArr.map(each => (
              <TodoTaskItem 
                key={each.id} 
                task={each} 
                toggleCheck={this.toggleCheck} 
                deleteTaskFunc={this.deleteTaskFunc} 
              />
            ))}
          </TasksListContainer>
        </TodoListPageBody>

        <Modal show={isModalOpen} className="add-task-modal-block">
          <div className="model-header-block">
            <h1> New Task </h1>
            <ImCross onClick={this.handleModalClose} className="menu-cross-btn" />
          </div>
          <hr />
          <div className="model-input-block">
            <input 
              placeholder="Task Title" 
              type="text" 
              value={newTask.taskHeading} 
              onChange={this.handleTaskTitleChange} 
            />
            <input 
              placeholder="Task Description" 
              type="text" 
              value={newTask.taskDescription} 
              onChange={this.handleTaskDescriptionChange} 
            />
            <p className="deadline-label"> Set Deadline: </p>
            <input 
              type="date" 
              id="taskDeadLine" 
              min={today} 
              value={newTask.dateTime}
              onChange={this.handleDateChange}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button onClick={this.handleSaveTask}> Save Task </Button>
          </div>
        </Modal>
      </TodoListMainPage>
    );
  }
}

export default TodoList;
