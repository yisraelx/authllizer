import extend from '../../src/utils/extend';

describe('extend()', () => {

    it('should extend target without source ', () => {
        let object = { foo: 'bar' };
        expect(extend(object)).toEqual(object);
    });

    it('should override property of the target object with the source object property',
        () => {
            let object = {
                foo: 'bar',
                data: { a: 1 }
            };
            let other = {
                foo: 'bob',
                data: { b: 2 }
            };
            expect(extend(object, other)).toEqual(other);
        }
    );

    it('should add property to target object from sources object', () => {
        let object = {
            foo: 'bar'
        };
        let other = {
            1: true
        };
        let other2 = {
            a: 1
        };
        let result = {
            foo: 'bar',
            1: true,
            a: 1
        };
        expect(extend(object, other, other2)).toEqual(result);
    });
});
