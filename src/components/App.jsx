import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FilePanel from './FilePanel'
import NavBar from './NavBar'
import { READY } from '../constants'
import '../styles/App.scss';
import HowTo from './HowTo';
import Contact from './Contact';

const App = (props) => {

  const [state, setState] = useState({
    loading: READY
  })

  const onProcessStateChange = (loadState) => {
    setState({ loading: loadState })
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <HowTo />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
          </Switch>
          <FilePanel 
            loading={state.loading}
            onProcessStateChange={onProcessStateChange}
          />
        </div>
      </div>
    </Router>

  );
}

export default App;
