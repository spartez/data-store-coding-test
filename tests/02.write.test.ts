import InMemoryStore from '../src/inMemoryStore';

describe('write', () => {
    let store: InMemoryStore;

    beforeEach(() => {
        store = new InMemoryStore();
    });

    it('updates value', async () => {
        await store.write('foo.bar', 42);

        expect(await store.read('foo.bar')).toBe(42);
    });

    it('updates object value', async () => {
        await store.write('foo', { bar: 42 });

        expect(await store.read('foo.bar')).toBe(42);
    });

    it('skips irrelevant slashes', async () => {
        await store.write('.foo..bar...', 42);

        expect(await store.read('foo...bar.')).toBe(42);
    });

    it('works with multiple properties', async () => {
        await store.write('foo.bar.a', 'a value');
        await store.write('foo.bar.b', 'b value');

        expect(await store.read('foo.bar.a')).toBe('a value');
        expect(await store.read('foo.bar.b')).toBe('b value');
    });

    it('overrides primitive value if needed', async () => {
        await store.write('foo.bar', 42);
        await store.write('foo.bar.baz', 'test');

        expect(await store.read('foo.bar')).toStrictEqual({
            baz: 'test',
        });
    });

    it(`doesn't allow to update root value`, async () => {
        await expect(() => store.write('.', 42)).rejects.toThrowError('Cannot update root value');
    });
});
