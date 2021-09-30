import InMemoryStore from '../src/inMemoryStore';

describe('observe', () => {
    let store: InMemoryStore;

    beforeEach(() => {
        store = new InMemoryStore();
    });

    it('triggers callback for exact path', async () => {
        const callback = jest.fn();
        await store.observe('foo.bar', callback);

        expect(callback).toBeCalledWith(undefined);

        await store.write('foo.bar', 42);

        expect(callback).toBeCalledWith(42);
    });

    it('triggers callback for parent path', async () => {
        const callback = jest.fn();
        await store.observe('foo', callback);

        expect(callback).toBeCalledWith(undefined);

        await store.write('foo.bar', 42);

        expect(callback).toBeCalledWith({
            bar: 42,
        });
    });

    it('triggers callback for root path', async () => {
        const callback = jest.fn();
        await store.observe('.', callback);

        expect(callback).toBeCalledWith({});

        await store.write('foo.bar', 42);

        expect(callback).toBeCalledWith({
            foo: {
                bar: 42,
            },
        });
    });

    it('triggers multiple callbacks for different paths', async () => {
        const fooCallback = jest.fn();
        const fooBarCallback = jest.fn();
        const fooBazCallback = jest.fn();
        await store.observe('foo', fooCallback);
        await store.observe('foo.bar', fooBarCallback);
        await store.observe('foo.baz', fooBazCallback);

        expect(fooCallback).toBeCalledWith(undefined);
        expect(fooBarCallback).toBeCalledWith(undefined);
        expect(fooBazCallback).toBeCalledWith(undefined);

        await store.write('foo.bar', 42);

        expect(fooCallback).toBeCalledWith({
            bar: 42,
        });
        expect(fooBarCallback).toBeCalledWith(42);
        expect(fooBazCallback).not.toBeCalledWith();
    });
});
