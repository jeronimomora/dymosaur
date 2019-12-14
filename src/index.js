import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert'
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import App from './components/App';
import StyledAlertTemplate from './components/StyledAlertTemplate'
 
// optional cofiguration
const options = {
  position: 'top center',
  timeout: 2000,
  offset: '30px',
  transition: 'fade'
}

const Root = () => (
    <AlertProvider template={StyledAlertTemplate} {...options}>
      <App />
    </AlertProvider>
  )

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
