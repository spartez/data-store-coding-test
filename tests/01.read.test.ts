import InMemoryStore from '../src/inMemoryStore';

describe('realtime database - read', () => {
    const db = new InMemoryStore({
        foo: {
            bar: 42,
        },
    });

    it('reads data at specified path', async () => {
        expect(await db.read('foo/bar')).toBe(42);
    });

    it('reads undefined if data is missing', async () => {
        expect(await db.read('foo/bar/baz/a/b/c')).toBe(undefined);
    });

    it('reads all children values', async () => {
        expect(await db.read('foo')).toStrictEqual({
            bar: 42,
        });
    });

    it('reads full data for root path', async () => {
        expect(await db.read('/')).toStrictEqual({
            foo: {
                bar: 42,
            },
        });
    });

    it(`doesn't read Object prototype properties`, async () => {
        expect(await db.read('toString')).toBe(undefined);
    });
});
