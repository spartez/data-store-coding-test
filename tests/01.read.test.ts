import InMemoryStore from '../src/inMemoryStore';

describe('read', () => {
    const store = new InMemoryStore({
        foo: {
            bar: 42,
        },
    });

    it('reads data at specified path', async () => {
        expect(await store.read('foo.bar')).toBe(42);
    });

    it('reads undefined if data is missing', async () => {
        expect(await store.read('foo.bar.baz.a.b.c')).toBe(undefined);
    });

    it('reads all children values', async () => {
        expect(await store.read('foo')).toStrictEqual({
            bar: 42,
        });
    });

    it('ignores repeated dots', async () => {
        expect(await store.read('foo...bar')).toBe(42);
    });

    it('reads full data for root path', async () => {
        expect(await store.read('.')).toStrictEqual({
            foo: {
                bar: 42,
            },
        });
    });

    it(`doesn't read Object prototype properties`, async () => {
        expect(await store.read('toString')).toBe(undefined);
    });
});
