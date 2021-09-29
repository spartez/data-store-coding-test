import InMemoryStore from '../src/inMemoryStore';

describe('realtime database - update', () => {
    let db: InMemoryStore;

    beforeEach(() => {
        db = new InMemoryStore();
    });

    it('updates value', async () => {
        await db.update('foo/bar', 42);

        expect(await db.read('foo/bar')).toBe(42);
    });

    it('updates object value', async () => {
        await db.update('foo', { bar: 42 });

        expect(await db.read('foo/bar')).toBe(42);
    });

    it('skips irrelevant slashes', async () => {
        await db.update('/foo//bar///', 42);

        expect(await db.read('foo///bar/')).toBe(42);
    });

    it('works with multiple properties', async () => {
        await db.update('foo/bar/a', 'a value');
        await db.update('foo/bar/b', 'b value');

        expect(await db.read('foo/bar/a')).toBe('a value');
        expect(await db.read('foo/bar/b')).toBe('b value');
    });

    it('overrides primitive value if needed', async () => {
        await db.update('foo/bar', 42);
        await db.update('foo/bar/baz', 'test');

        expect(await db.read('foo/bar')).toStrictEqual({
            baz: 'test',
        });
    });

    it(`doesn't allow to update root value`, async () => {
        await expect(() => db.update('/', 42)).rejects.toThrowError();
    });
});
