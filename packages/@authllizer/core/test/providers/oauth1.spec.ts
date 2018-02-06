import {OAuth1Provider} from '../../src/providers/oauth1';
import {AdapterRequestType} from '../../src/adapters';

describe('OAuth1Provider', () => {
    describe('authenticate()', () => {
        it('should run a auth process and return the code', () => {
            let provider = new (OAuth1Provider as any)('', '');
            spyOn(provider, 'getRequestToken').and.callFake(async () => {
                return 'getRequestToken';
            });

            spyOn(provider, 'getPermissions').and.callFake(async (response) => {
                expect(response).toBe('getRequestToken');
                return 'dialogResponse';
            });

            spyOn(provider, 'getAccessToken').and.callFake(async (dialogResponse, options) => {
                expect(dialogResponse).toBe('dialogResponse');
                return 'token';
            });

            return provider.authenticate('userData').then((token) => {
                expect(token).toBe('token');
            });
        });
    });

    describe('getRequestToken()', () => {
        it('should get a request token from the backend', () => {
            let SomeProvider = OAuth1Provider.extend({
                name: 'some',
                redirectUri: 'https://example.com',
                foo: 'bar',
                requestTokenParams: {
                    foo: 'some'
                }
            });

            let mockAdapter = {
                async request({type, data, provider, token}) {
                    expect(type).toBe(AdapterRequestType.link);
                    expect(provider).toBe('some');
                    expect(token).toBe('***');
                    expect(data).toEqual({callback: 'https://example.com', some: 'bar'});
                    return {response: 'data'};
                }
            };

            let someProvider = new (SomeProvider as any)(mockAdapter, () => {
            });

            let options = {
                type: AdapterRequestType.link,
                token: '***',
                provider: 'some'
            };
            return someProvider.getRequestToken(options).then((data) => {
                expect(data).toBe('data');
            });
        });
    });

    describe('getPermissions()', () => {
        it('should make url request and open dialog and resolve provider data', () => {
            class MockDialog {
                async open(url) {
                    expect(url).toBe('https://api.provider.com/auth?foo=bar');
                    return 'data';
                }
            }

            let mockResponse = {
                foo: 'bar'
            };
            let SomeProvider = OAuth1Provider.extend({
                authorizationEndpoint: 'https://api.provider.com/auth'
            });

            let someProvider = new (SomeProvider as any)(null, MockDialog);

            someProvider.getPermissions(mockResponse).then((data) => {
                expect(data).toBe('data');
            });
        });
    });

    describe('getAccessToken()', () => {
        it('should exchange a provider code with the backend and resolve token', () => {
            let SomeProvider = OAuth1Provider.extend({
                name: 'some',
                redirectUri: 'http://example.com',
                authenticateParams: {
                    color: 'some'
                }
            });

            let mockAdapter = {
                async request({type, token, provider, data}) {
                    expect(data).toEqual({some: 'red', foo: 'bar', callback: 'http://example.com'});
                    expect(provider).toBe('some');
                    expect(token).toBe('***');
                    expect(type).toBe(AdapterRequestType.authenticate);
                    return 'token';
                }
            };

            let someProvider = new (SomeProvider as any)(mockAdapter, () => {
            });
            let options = {
                type: AdapterRequestType.authenticate,
                token: '***',
                provider: 'some',
                data: {foo: 'bar'}
            };
            someProvider.getAccessToken({color: 'red'}, options).then((token) => {
                expect(token).toBe('token');
            });
        });
    });
});
