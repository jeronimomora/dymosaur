import React, { useState } from 'react';
import Loader from 'react-loader-spinner'
import FileDrop from './components/FileDrop';
import { READY } from './constants'
import './App.css';



const App = (props) => {

  const [state, setState] = useState({
    loading: READY
  })

  const onProcessStateChange = (loadState) => {
    setState({ loading: loadState })
  }

  return (
    <div className="App">
      <div className="App-header">Dymosaur - The Magical Amazon Label Cropper</div>
      {
        state.loading === READY ? 
        
        <FileDrop onProcessStateChange={onProcessStateChange}/> : 
        <div style={{ marginTop: 210 }}>
          <Loader
            type="Circles"
            color="#8A2BE2"
            height={100}
            width={100}
            timeout={60000}
          />
        </div>
      }
    </div>
  );
}

export default App;
