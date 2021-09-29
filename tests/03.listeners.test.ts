import InMemoryStore from '../src/inMemoryStore';

describe('listeners', () => {
    let store: InMemoryStore;

    beforeEach(() => {
        store = new InMemoryStore();
    });

    it('tiggers callback for exact path', async () => {
        const callback = jest.fn();
        await store.addListener('foo/bar', callback);

        expect(callback).toBeCalledWith(undefined);

        await store.write('foo/bar', 42);

        expect(callback).toBeCalledWith(42);
    });

    it('tiggers callback for parent path', async () => {
        const callback = jest.fn();
        await store.addListener('foo', callback);

        expect(callback).toBeCalledWith(undefined);

        await store.write('foo/bar', 42);

        expect(callback).toBeCalledWith({
            bar: 42,
        });
    });

    it('tiggers callback for root path', async () => {
        const callback = jest.fn();
        await store.addListener('/', callback);

        expect(callback).toBeCalledWith({});

        await store.write('foo/bar', 42);

        expect(callback).toBeCalledWith({
            foo: {
                bar: 42,
            },
        });
    });

    it('tiggers multiple callbacks for different paths', async () => {
        const fooCallback = jest.fn();
        const fooBarCallback = jest.fn();
        const fooBazCallback = jest.fn();
        await store.addListener('foo', fooCallback);
        await store.addListener('foo/bar', fooBarCallback);
        await store.addListener('foo/baz', fooBazCallback);

        expect(fooCallback).toBeCalledWith(undefined);
        expect(fooBarCallback).toBeCalledWith(undefined);
        expect(fooBazCallback).toBeCalledWith(undefined);

        await store.write('foo/bar', 42);

        expect(fooCallback).toBeCalledWith({
            bar: 42,
        });
        expect(fooBarCallback).toBeCalledWith(42);
        expect(fooBazCallback).not.toBeCalledWith();
    });
});
