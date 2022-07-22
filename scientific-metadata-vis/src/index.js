import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as d3 from "d3";

let graph;

// d3.json("test.json").then(_graph => {
//     graph = _graph;
//     alert(graph)
//     console.log(graph)
// }).catch(e => console.error(e))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
