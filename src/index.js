import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import Cookies from './Global/index';
import rootReducers from './reducers';
var zhang = {
  name: "zhang",
  age: 23,
  height: "178cm",
  weight: "66kg"
}
let expires =new Date();
sessionStorage.setItem('zhang', JSON.stringify(zhang));
// 设置一条完整的cookie
Cookies.Cookies.setAll('zhang', zhang,new Date(60*60));
console.log(Cookies.Cookies.getAll('zhang'));
const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(logger)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
