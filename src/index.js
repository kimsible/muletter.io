import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Form from './Form';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <Router>
    <div>
      <Route path="/:base64Url/:publicKey" component={Form} />
      <Route exact path="/:param?" component={Home} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
