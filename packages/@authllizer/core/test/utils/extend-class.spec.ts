import extendClass from '../../src/utils/extend-class';

describe('extendClass()', () => {

    it('should set the options properties on the class', () => {
        let options = {
            foo: 'bar',
            color: 'red'
        };

        class Some {
            static extend = extendClass;
        }

        let MySome = Some.extend(options);
        let some = new MySome as any;
        expect(some.foo).toBe(options.foo);
        expect(some.color).toBe(options.color);
    });

    it('should override property of the class with the options object property', () => {
        let options = {
            foo: 'bar',
            color: 'blue'
        };

        class Some {
            static extend = extendClass;
            foo = 'bob';
            color;
        }

        Some.prototype.color = 'red';

        let MySome = Some.extend(options);
        let some = new MySome as any;

        expect(some.foo).toBe(options.foo);
        expect(some.color).toBe(options.color);
    });
});
