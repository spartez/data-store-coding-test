import TypedStore from '../src/typedStore';
import { Equal, Expect } from './type-utils';

type TestStoreSchema = {
    foo: {
        bar: {
            baz: number;
        };
        hello: string;
    };
};

describe('typed', () => {
    const store = new TypedStore<TestStoreSchema>({
        foo: {
            bar: {
                baz: 42,
            },
            hello: 'world',
        },
    });

    it('returns number type', async () => {
        const value = await store.read('foo.bar.baz');

        type assert = Expect<Equal<typeof value, number>>;
    });

    it('returns string type', async () => {
        const value = await store.read('foo.hello');

        type assert = Expect<Equal<typeof value, string>>;
    });

    it('returns object type', async () => {
        const value = await store.read('foo.bar');

        type assert = Expect<Equal<typeof value, { baz: number }>>;
    });
});
