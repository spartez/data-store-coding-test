import { StoredObject, StoredValue } from './dataStore';
import InMemoryStore from './inMemoryStore';

type PathValue<T, P> = StoredValue;
export default class TypedStore<T extends StoredObject> extends InMemoryStore {
    constructor(initialData: T) {
        super(initialData);
    }

    public async read<P extends string>(path: P): Promise<PathValue<T, P>> {
        return super.read(path) as unknown as PathValue<T, P>;
    }
}
