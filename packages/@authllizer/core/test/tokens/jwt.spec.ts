import * as jsonwebtoken from 'jsonwebtoken';
import { IJWTPayload, JWT } from '../../src/tokens/jwt';

describe('JWT', () => {
    describe('static parse()', () => {
        it('should throw error for invalid token', () => {
            expect(() => {
                JWT.parse('my token');
            }).toThrow(new Error('Token is invalid or missing.'));
        });

        it('should decode the token and return the payload', () => {
            let payload: IJWTPayload = { foo: 'bar', iat: 1234567890 };
            let tokenString = jsonwebtoken.sign(payload, 'secret');
            expect(JWT.parse(tokenString)).toEqual(payload);
        });
    });

    describe('expire', () => {
        it('should return the token expired date ', () => {
            let date = new Date(10000);
            let exp = Number(date) / 1000;
            let tokenString = jsonwebtoken.sign({ exp }, 'secret');
            let token = new JWT(tokenString);

            expect(Number(token.expire)).toBe(Number(date));
        });
    });

    describe('getPayload()', () => {
        it('should return the payload', () => {
            let payload: IJWTPayload = { foo: 'bar', iat: 1234567890 };
            let tokenString = jsonwebtoken.sign(payload, 'secret');
            let token = new JWT(tokenString);
            expect(token.getPayload()).toEqual(payload);
        });
    });

    describe('isExpired()', () => {
        it('should be not expired', () => {
            let tokenString = jsonwebtoken.sign({}, 'secret', { expiresIn: 10 });
            let token = new JWT(tokenString);
            expect(token.isExpired()).toBeFalsy();
        });
        it('should be expired', () => {
            let tokenString = jsonwebtoken.sign({}, 'secret', { expiresIn: -1 });
            let token = new JWT(tokenString);
            expect(token.isExpired()).toBeTruthy();
        });
    });

    describe('isValid()', () => {
        it('should be not valid', () => {
            let tokenString = jsonwebtoken.sign({}, 'secret', { expiresIn: -1 });
            let token = new JWT(tokenString);
            expect(token.isValid()).toBeFalsy();
        });
        it('should be valid', () => {
            let tokenString = jsonwebtoken.sign({}, 'secret', { expiresIn: 10 });
            let token = new JWT(tokenString);
            expect(token.isValid()).toBeTruthy();
        });
    });

    describe('toHeader()', () => {
        it('should return the token as header value', () => {
            let payload: IJWTPayload = { foo: 'bar', iat: 1234567890 };
            let tokenString = jsonwebtoken.sign(payload, 'secret');
            let token = new JWT(tokenString);
            expect(token.toHeader()).toBe(`Bearer ${ tokenString }`);
        });
    });

    describe('toString()', () => {
        it('should return the token', () => {
            let payload: IJWTPayload = { foo: 'bar', iat: 1234567890 };
            let tokenString = jsonwebtoken.sign(payload, 'secret');
            let token = new JWT(tokenString);
            expect(token.toString()).toBe(tokenString);
        });
    });

    describe('toJSON()', () => {
        it('should return the payload', () => {
            let payload: IJWTPayload = { foo: 'bar', iat: 1234567890 };
            let tokenString = jsonwebtoken.sign(payload, 'secret');
            let token = new JWT(tokenString);
            expect(token.toJSON()).toEqual(payload);
        });
    });
});
