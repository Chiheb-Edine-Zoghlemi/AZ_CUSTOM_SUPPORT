import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  Chat from './pages/chat/chat'
import Login from './pages/login/login'
import Notfound from './pages/404/notfound';
function App() {
  return (
  <Router>
        <Switch>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route  path="*">
            <Notfound/>
          </Route>
        </Switch>
      
    </Router>
  )
}

export default App;
