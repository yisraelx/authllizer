import merge from '../../src/utils/merge';

describe('merge()', () => {
    it('should override property of the target object with the source object property',
        () => {
            let object = {
                foo: 'bar',
                data: {a: 1}
            };
            let other = {
                foo: 'bob',
                data: {b: 2}
            };
            merge(object, other);
            expect(object).toEqual({
                foo: 'bob',
                data: {a: 1, b: 2}
            });
        }
    );

    it('should merge other objects property on set to empty object',
        () => {
            let object = {
                foo: 'bar',
                data: {a: 1}
            };
            let other = {
                foo: 'bob',
                data: {b: 2}
            };
            let result = merge({}, object, other);
            expect(object).toEqual({
                foo: 'bar',
                data: {a: 1}
            });
            expect(other).toEqual({
                foo: 'bob',
                data: {b: 2}
            });
            expect(result).toEqual({
                foo: 'bob',
                data: {a: 1, b: 2}
            });
        }
    );
});
