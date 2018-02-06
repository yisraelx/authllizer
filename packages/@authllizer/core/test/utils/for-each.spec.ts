
import forEach from '../../src/utils/for-each';

describe('forEach()', () => {

    it('should iteratee on Array', () => {
        forEach([0, 1, 2], (value, index) => {
            expect(value).toBe(+index);
        });
    });

    it('should iteratee on Object', () => {
        forEach({0: 0, 1: 1, 2: 2}, (value, key) => {
            expect(value).toBe(+key);
        });
    });

    it('should return the collection', () => {
        let collection = [0, 1, 2];
        expect(forEach(collection)).toEqual(collection);
    });

    it('should return empty array if collection is not defined', () => {
        expect(forEach()).toEqual([]);
    });
});
