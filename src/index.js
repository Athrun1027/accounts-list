import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import Records from './Components/Records';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Records/>,
    document.getElementById('root')
);
registerServiceWorker();
