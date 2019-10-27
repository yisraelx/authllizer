import { AdapterRequestType } from '../../src/adapters';
import { OAuth2Provider } from '../../src/providers/oauth2';

describe('OAuth2Provider', () => {
    describe('scope', () => {
        it('should build string scope', () => {
            class MyProvider extends OAuth2Provider {
                scopeDelimiter = ' ';
                scopeParams = ['email', 'profile'];
                scopePrefix = 'some';
            }

            let myProvider = new (MyProvider as any);
            expect(myProvider.scope).toBe('some email profile');
        });
    });
    describe('authenticate()', () => {
        it('should return promise reject if state not match', () => {
            let someProvider = new (OAuth2Provider as any);
            spyOn(someProvider, 'getPermissions').and.callFake(async () => {
                return { state: '***' };
            });

            return someProvider.authenticate().catch((error) => {
                expect(error.message).toBe('The value returned in the state parameter does not match the state value from your original authorization code request.');
            });
        });

        it('should return token if responseType is token', () => {
            let SomeProvider = OAuth2Provider.extend({
                responseType: 'token'
            });
            let someProvider = new (SomeProvider as any);

            spyOn(someProvider, 'getPermissions').and.callFake(async () => {
                return { access_token: '***', state: someProvider.state };
            });

            return someProvider.authenticate().then(({ token, response }) => {
                expect(token).toBe('***');
                expect(response).toEqual({ access_token: token, state: someProvider.state });
            });
        });
        it('should return token if responseType is code', () => {

            let someProvider = new (OAuth2Provider as any);

            spyOn(someProvider, 'getPermissions').and.callFake(async () => {
                return { code: '***', state: someProvider.state };
            });

            spyOn(someProvider, 'getAccessToken').and.callFake(async (auth, user) => {
                expect(auth).toEqual({ code: '***', state: someProvider.state });
                expect(user).toEqual({ foo: 'bar' });
                return 'data';
            });

            return someProvider.authenticate({ foo: 'bar' }).then((data) => {
                expect(data).toBe('data');
            });
        });
    });

    describe('getPermissions()', () => {
        it('should get code', () => {
            let MyProvider = OAuth2Provider.extend({
                name: 'test',
                authorizationEndpoint: 'https://test.com/auth',
                myFoo: 'bar',
                myColor: 'black',
                baseDialogParams: ['name'],
                dialogParams: ['my_foo', 'my.color']
            } as any);
            let myProvider = new (MyProvider as any);
            spyOn(myProvider, 'openDialog').and.callFake(async (url: string) => {
                expect(url).toBe('https://test.com/auth?name=test&my_foo=bar&my.color=black');
                return 'data';
            });
            return myProvider.getPermissions().then((data) => {
                expect(data).toBe('data');
            });
        });
    });

    describe('getAccessToken()', () => {
        it('should get access token', () => {
            class MockAdapter {
                async request({ data, token, provider, type }) {
                    expect(type).toBe(AdapterRequestType.link);
                    expect(token).toBe('***');
                    expect(provider).toBe('some');
                    expect(data).toEqual({
                        code: '***',
                        myFoo: 'bar',
                        color: 'red',
                        redirect_uri: 'https://example.com'
                    });
                    return 'token';
                }
            }

            let MyProvider = OAuth2Provider.extend({
                name: 'test',
                redirectUri: 'https://example.com',
                foo: 'bar',
                authenticateParams: {
                    foo: 'myFoo'
                }
            } as any);
            let myProvider = new (MyProvider as any)(new MockAdapter);
            let options = {
                type: AdapterRequestType.link,
                data: { color: 'red' },
                provider: 'some',
                token: '***'
            };
            return myProvider.getAccessToken({ code: '***' }, options).then((token) => {
                expect(token).toBe('token');
            });
        });
    });
});
