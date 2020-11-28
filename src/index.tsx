import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Main/App';
import reportWebVitals from './reportWebVitals';
import {MuiThemeProvider} from "@material-ui/core/";
import {customTheme} from "./Utilities/Theme/CustomTheme";

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={customTheme}>
            <App/>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
