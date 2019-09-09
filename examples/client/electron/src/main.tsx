import authllizer from '@authllizer/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app.component';

import { AUTHLLIZER_CONFIG } from './authllizer.config';

import './styles.css';

authllizer.config(AUTHLLIZER_CONFIG);
ReactDOM.render(<App/>, document.getElementById('app'));

