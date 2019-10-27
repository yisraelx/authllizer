import { AdapterRequestType, IAdapterRequestOptions } from '../../src/adapters/adapter';
import { BackendAdapter } from '../../src/adapters/backend';

function createHttpClientMock(requestUrl, requestOptions, responseOptions) {
    return {
        async request(url, options) {
            expect(url).toEqual(requestUrl);
            expect(options).toEqual(requestOptions);
            return responseOptions;
        }
    };
}

describe('Backend', () => {
    describe('request()', () => {
        it('should make authenticate request successfully and return token', () => {
            let data = { foo: 'bar' };
            let responseToken = 'token.foo.bar';
            let responseOptions = { access_token: responseToken, color: 'red' };
            let httpClient = createHttpClientMock('/auth/example', {
                method: 'POST',
                params: {},
                headers: {},
                data,
                withCredentials: false
            }, responseOptions);
            let backend = new BackendAdapter(httpClient);
            let options: IAdapterRequestOptions = {
                type: AdapterRequestType.authenticate,
                extractToken: true,
                data,
                provider: 'example'
            };
            backend.request(options).then(({ token, response }) => {
                expect(token).toBe(responseToken);
                expect(response).toBe(responseOptions);
            });
        });

        it('should make signIn request successfully and return token', () => {
            let data = { email: 'foo@example.com', password: 'Pa$$w0rd' };
            let responseOptions = 'token.foo.bar';
            let httpClient = createHttpClientMock('/auth/login', {
                method: 'POST',
                params: { apiKey: '***' },
                headers: { foo: 'bar' },
                data,
                withCredentials: false
            }, responseOptions);
            let MyBackend = BackendAdapter.extend({
                signIn: '/login',
                tokenPath: '',
                defaultHttpOptions: {
                    params: { apiKey: '***' },
                    headers: { foo: 'bar' }
                }
            });
            let backend = new MyBackend(httpClient);
            let options: IAdapterRequestOptions = {
                type: AdapterRequestType.signIn,
                data,
                extractToken: true
            };
            backend.request(options).then(({ token, response }) => {
                expect(token).toBe(responseOptions);
                expect(response).toBe(responseOptions);
            });
        });

        it('should make signUp request successfully and return token', () => {
            let data = { name: 'John Lennon', email: 'john.lennon@gmail.com', password: 'Pa$$w0rd' };
            let tokenResponse = 'token.foo.bar';
            let responseOptions = { data: { access_token: tokenResponse } };
            let httpClient = createHttpClientMock('/signup', {
                method: 'POST',
                params: {},
                headers: { foo: 'bar' },
                data,
                withCredentials: false
            }, responseOptions);
            let MyAdapter = BackendAdapter.extend({
                baseUrl: void 0,
                signUp: {
                    url: '/signup',
                    httpOptions: {
                        headers: { foo: 'bar' }
                    }
                },
                tokenPath: 'data.access_token'
            });
            let myAdapter = new MyAdapter(httpClient);
            let options: IAdapterRequestOptions = {
                type: AdapterRequestType.signUp,
                data,
                extractToken: true
            };
            myAdapter.request(options).then(({ token, response }) => {
                expect(token).toBe(tokenResponse);
                expect(response).toBe(responseOptions);
            });
        });

        it('should make signOut request successfully', () => {
            let token = '***';
            let httpClient = createHttpClientMock('/auth/signout', {
                method: 'POST',
                params: {},
                headers: { 'Authorization': token },
                withCredentials: false
            }, void 0);
            let backend = new BackendAdapter(httpClient);
            let options: IAdapterRequestOptions = {
                type: AdapterRequestType.signOut,
                token: {
                    toHeader() {
                        return token;
                    }
                } as any
            };
            backend.request(options).then(({ response, token }) => {
                expect(token).toBeUndefined();
                expect(response).toBeUndefined();
            });
        });

        it('should be unlink successfully', () => {
            let token = '***';
            let data = { provider: 'some' };
            let httpClient = createHttpClientMock('/auth/unlink', {
                method: 'POST',
                params: {},
                headers: { 'Authorization': token },
                data,
                withCredentials: false
            }, void 0);
            let backend = new BackendAdapter(httpClient);
            let options: IAdapterRequestOptions = {
                type: AdapterRequestType.unlink,
                data,
                token: {
                    toHeader() {
                        return token;
                    }
                } as any
            };
            backend.request(options).then(({ response, token }) => {
                expect(response).toBeUndefined();
                expect(token).toBeUndefined();
            });
        });
    });

    describe('refresh()', () => {
        it('should be refresh token successfully', () => {
            let token = '***';
            let newToken = 'new.token';
            let responseOptions = {
                access_token: newToken
            };
            let httpClient = createHttpClientMock('/auth/refresh', {
                method: 'POST',
                params: {},
                headers: { 'Authorization': token },
                withCredentials: false
            }, responseOptions);
            let backend = new BackendAdapter(httpClient);
            let options: IAdapterRequestOptions = {
                type: AdapterRequestType.refresh,
                token: {
                    toHeader() {
                        return token;
                    }
                } as any,
                extractToken: true
            };

            backend.request(options).then(({ response, token }) => {
                expect(response).toEqual(responseOptions);
                expect(token).toBe('new.token');
            });
        });

        it('should make some request successfully and return response', () => {
            class MyBackendAdapter extends BackendAdapter {
                baseUrl = 'https://example.com';
                defaultHttpOptions = {
                    method: 'GET',
                    data: { name: 'bob' },
                    params: { color: 'blue' },
                    headers: { age: 120 },
                    withCredentials: true
                };
            }

            let responseOptions = 'My Response!';
            let httpClient = createHttpClientMock('https://example.com/some', {
                method: 'GET',
                params: { color: 'blue', foo: 'bar', name: 'bob' },
                headers: { age: 120 },
                withCredentials: true
            }, responseOptions);
            let backend = new MyBackendAdapter(httpClient);
            let options: IAdapterRequestOptions = {
                type: 'some' as any,
                data: { foo: 'bar' }
            };
            backend.request(options).then(({ response, token }) => {
                expect(token).toBeUndefined();
                expect(response).toBe(responseOptions);
            });
        });
    });

    describe('prepareUrl()', () => {
        it('should return the routeUrl join with the baseUrl', () => {
            let baseUrl = 'https://test.com';
            let routeUrl = '/foo';
            let url = (BackendAdapter.prototype as any).prepareUrl.call({ baseUrl }, {}, { url: routeUrl });
            expect(url).toBe(`${ baseUrl }${ routeUrl }`);
        });

        it('should return the routeUrl is full url', () => {
            let baseUrl = 'https://test.com';
            let routeUrl = 'https://example.com/foo';
            let url = (BackendAdapter.prototype as any).prepareUrl.call({ baseUrl }, {}, { url: routeUrl });
            expect(url).toBe(routeUrl);
        });

        it('should return the routeUrl if no baseUrl', () => {
            let routeUrl = '/foo';
            let url = (BackendAdapter.prototype as any).prepareUrl.call({}, {}, { url: routeUrl });
            expect(url).toBe(routeUrl);
        });

    });
});

