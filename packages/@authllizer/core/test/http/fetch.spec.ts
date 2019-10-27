import { FetchHttpClient } from '../../src/http/fetch';

describe('FetchHttpClient', () => {
    describe('request()', () => {
        it('should request json data', () => {
            let data = { foo: 'bar' };
            let url = 'http://example.com';
            let options = {
                method: 'PUT',
                params: { color: 'red' },
                data,
                withCredentials: false
            };
            let mockFetch = async (requestUrl, requestOptions) => {
                expect(requestUrl).toBe(`${ url }?color=red`);
                expect(requestOptions).toEqual({
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                });
                return {
                    status: 200, json() {
                        return 'response';
                    }
                };
            };
            let client = new FetchHttpClient(mockFetch as any);

            client.request(url, options).then((response) => {
                expect(response).toBe('response');
            });
        });
    });
});
