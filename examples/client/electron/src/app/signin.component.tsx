import * as React from 'react';
import * as PropTypes from 'prop-types';
import {History} from 'history';
import authllizer from '@authllizer/core';

export default class SignInComponent extends React.Component<{ history?: History }> {

    // providers fontawesome class fa-<name>
    static providers = {
        bitbucket: 'bitbucket',
        facebook: 'facebook',
        foursquare: 'foursquare',
        github: 'github',
        google: 'google',
        instagram: 'instagram',
        linkedin: 'linkedin',
        live: 'windows',
        reddit: 'reddit',
        spotify: 'spotify',
        twitch: 'twitch',
        twitter: 'twitter',
        vk: 'vk',
        wordpress: 'wordpress',
        yahoo: 'yahoo'
    };

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    authenticate(provider: string) {
        authllizer.authenticate(provider).then(() => {
            this.props.history.push('/');
        }).catch((error: Error | Response) => {
            if ((error as Error).message) {
                alert((error as Error).message);
            } else if ((error as Response).body) {
                let {body, statusText} = (error as Response) as any;
                alert(body && body.message ? body.message : statusText);
            } else {
                alert(error);
            }
        });
    }

    render() {
        return <section>
            <h2 className='text-center'>Sign in</h2>
            {
                Object.keys(SignInComponent.providers).map((name: string, index: number) => {
                    let iconName = SignInComponent.providers[name];
                    return <button key={index} className={`btn btn-block btn-${name}`}
                                   onClick={this.authenticate.bind(this, name)}>
                        <i className={`fa fa-${iconName}`}></i> Sign in with {name[0].toUpperCase() + name.substring(1)}
                    </button>;
                })
            }
        </section>;
    }
}
