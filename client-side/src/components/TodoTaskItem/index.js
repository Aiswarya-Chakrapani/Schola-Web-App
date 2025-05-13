import { Component } from 'react';
import './index.css';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from "react-icons/md";

class TodoTaskItem extends Component {
  clickCheckButton = () => {
    const { task, toggleCheck } = this.props;
    toggleCheck(task.id);
  };

  render() {
    const { task, deleteTaskFunc } = this.props;
    const { taskHeading, taskDescription, check, dateTime, id } = task;
    
    const checkBtnClassName = check ? 'check-button' : 'un-check-button';
    const checkTitle = check ? 'check-title' : '';
    
    const onDeleteTask = () => {
      deleteTaskFunc(id);
    };

    return (
      <div className="task-block">
        <div className="first-half">
          <div className="task-descr">
            <h1 className={checkTitle}>{taskHeading}</h1>
            <h4>{taskDescription}</h4>
          </div>
          <button className={checkBtnClassName} onClick={this.clickCheckButton}>
            <FaCheck />
          </button>
        </div>
        <hr className='hr-task-line' />
        <div className='second-half'>
          <p>{dateTime}</p>
          <button onClick={onDeleteTask} className='delete-btn'>
            <MdOutlineDeleteOutline />
          </button>
        </div>
      </div>
    );
  }
}

export default TodoTaskItem;
