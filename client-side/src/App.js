import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import YoutubeTimeStamps from './components/YoutubeTimeStamps'
import Profile from './components/Profile'
import TodoList from './components/TodoList'
import TeacherPortal from './components/TeachersPortal'
import TimeTable from './components/TimeTable'
import DoubtsPanel from './components/DoubtsPanel'
import ChatBot from './components/PersonalChatbot'
import LeaderBoard from './components/LeaderBoard'
import PDFDataExtraction from './components/PDFDataExtarction'
import TechNews from './components/TechNews'
import SavedNotes from './components/SavedNotes'
import DoubtsPageNew from './components/DoubtsPageNew'

import ToggleThemeContext from './Context/ToggleThemeContext'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: true,
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  render () {
    const {isDarkTheme} = this.state
    return (
      <ToggleThemeContext.Provider value = {{isDarkTheme,toggleTheme: this.toggleTheme}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/ytstamps" component={YoutubeTimeStamps} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/todolist" component={TodoList} />
          <ProtectedRoute exact path="/timetable" component={TimeTable} />
          <ProtectedRoute exact path="/chatbot" component={ChatBot} />
          <ProtectedRoute exact path="/pdfdataextraction" component={PDFDataExtraction} />
          <ProtectedRoute exact path="/technews" component={TechNews} />
          <ProtectedRoute exact path="/doubts" component={DoubtsPanel} />
          <ProtectedRoute exact path="/teachersportal" component={TeacherPortal} />
          <ProtectedRoute exact path="/LeaderBoard" component={LeaderBoard} />
          <ProtectedRoute exact path="/SavedNotes" component={SavedNotes} />
          <ProtectedRoute exact path="/newdoubts" component={DoubtsPageNew} />
        </Switch>
      </ToggleThemeContext.Provider>
    )
  }
}

export default App