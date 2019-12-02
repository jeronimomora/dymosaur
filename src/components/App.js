import React, { useState } from 'react';
import FilePanel from './FilePanel'
import NavBar from './NavBar'
import { READY } from '../constants'
import '../css/App.css';
import HowTo from './HowTo';

const App = (props) => {

  const [state, setState] = useState({
    loading: READY
  })

  const onProcessStateChange = (loadState) => {
    setState({ loading: loadState })
  }

  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <HowTo />
        <FilePanel 
          loading={state.loading}
          onProcessStateChange={onProcessStateChange}
        />
      </div>
    </div>
  );
}

export default App;
