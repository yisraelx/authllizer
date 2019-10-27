import authllizer from '@authllizer/core';
import { History } from 'history';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import environment from '../environments/environment';

export interface IProfile {
    picture?: string;
    displayName?: string;
    email?: string;
}

export default class HomeComponent extends React.Component<{history?: History}, IProfile> {

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    async componentDidMount() {
        let profile: IProfile = await this.getProfile();
        this.setState(profile);
    }

    getProfile(): Promise<IProfile> {
        return fetch(`${ environment.backendUrl }/api/me`, {
            headers: {
                'Authorization': authllizer.getToken().toHeader()
            }
        })
            .then((response: Response) => {
                return response.ok ? response.json() : {};
            });
    }

    signOut() {
        authllizer
            .signOut()
            .then(() => {
                this.props.history.push('/signin');
            })
            .catch((error: Error | Response | any) => {
                let { body, statusText, message } = error;
                alert((body && (body.message || statusText)) || message);
            });
    }

    render() {
        let { picture, displayName }: IProfile = this.state || {};

        return <div>
            <img className='avatar img-circle center-block' src={ picture || 'https://placehold.it/200x200' }/>
            <p className='welcome'>Welcome{ displayName && <span>,<br/>{ displayName }</span> }!</p>
            <button className='btn btn-block btn-danger' onClick={ this.signOut.bind(this) }>
                <i className='fa fa-sign-out'></i> Sign out
            </button>
        </div>;
    }

}
