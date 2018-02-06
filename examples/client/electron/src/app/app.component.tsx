
import * as React from 'react';
import AppRouter from './app.router';

export default class AppComponent extends React.Component {

    render() {
        return <div className="container">
            <div className="row">
                <div className="center-form panel">
                    <div className="panel-body">
                        <AppRouter />
                    </div>
                </div>
            </div>
        </div>;
    }
}