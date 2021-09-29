import InMemoryStore from '../src/inMemoryStore';

describe('realtime database - listeners', () => {
    let db: InMemoryStore;

    beforeEach(() => {
        db = new InMemoryStore();
    });

    it('tiggers callback for exact path', async () => {
        const callback = jest.fn();
        await db.addListener('foo/bar', callback);

        expect(callback).toBeCalledWith(undefined);

        await db.update('foo/bar', 42);

        expect(callback).toBeCalledWith(42);
    });

    it('tiggers callback for parent path', async () => {
        const callback = jest.fn();
        await db.addListener('foo', callback);

        expect(callback).toBeCalledWith(undefined);

        await db.update('foo/bar', 42);

        expect(callback).toBeCalledWith({
            bar: 42,
        });
    });

    it('tiggers callback for root path', async () => {
        const callback = jest.fn();
        await db.addListener('/', callback);

        expect(callback).toBeCalledWith({});

        await db.update('foo/bar', 42);

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
        await db.addListener('foo', fooCallback);
        await db.addListener('foo/bar', fooBarCallback);
        await db.addListener('foo/baz', fooBazCallback);

        expect(fooCallback).toBeCalledWith(undefined);
        expect(fooBarCallback).toBeCalledWith(undefined);
        expect(fooBazCallback).toBeCalledWith(undefined);

        await db.update('foo/bar', 42);

        expect(fooCallback).toBeCalledWith({
            bar: 42,
        });
        expect(fooBarCallback).toBeCalledWith(42);
        expect(fooBazCallback).not.toBeCalledWith();
    });
});
