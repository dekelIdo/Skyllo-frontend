import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
import { RootCmp } from './root-cmp'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './assets/styles/main.scss'


import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';



ReactDOM.render(

  <React.StrictMode>
      <Provider store={store}>
        <Router>

<GoogleOAuthProvider clientId="827098261859-v6v47a9sa4k29e97ucd6tmjf4la569oj.apps.googleusercontent.com">
          <RootCmp />
</GoogleOAuthProvider>
          {/* //להקיף */}
        </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
