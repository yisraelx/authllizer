import * as React from 'react';
import authllizer from '@authllizer/core';
import {History} from 'history';
import * as PropTypes from 'prop-types';
import {environment} from '../environments/environment';

export interface IProfile {
    picture?: string;
    displayName?: string;
    email?: string;
}

export default class HomeComponent extends React.Component<{ history?: History }, IProfile> {

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    async componentDidMount() {
        let profile: IProfile = await this.getProfile();
        this.setState(profile);
    }

    getProfile(): Promise<IProfile> {
        return fetch(`${environment.backendUrl}/api/me`, {
            headers: {
                'Authorization': authllizer.getToken().toHeader()
            }
        }).then((response: Response) => {
            return response.ok ? response.json() : {};
        });
    }

    signOut() {
        authllizer.signOut().then(() => {
            this.props.history.push('/signin');
        }).catch((error: Response) => {
            alert(error);
        });
    }

    render() {
        let profile: IProfile = this.state || {};
        return <section>
            <img className='img-circle center-block' src={profile.picture || 'https://placehold.it/100x100'}/>
            <h2 className='text-center'>Welcome{profile.displayName ? `,\n ${profile.displayName}` : ''}!!!</h2>
            <button className='btn btn-block btn-danger' onClick={this.signOut.bind(this)}>
                <i className='fa fa-door'></i> Sign out
            </button>
        </section>;
    }
}
