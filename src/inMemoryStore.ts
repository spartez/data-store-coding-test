import DataStore, { ObserverCallback, StoredObject, StoredValue } from './dataStore';

export default class InMemoryStore implements DataStore {
    protected data: StoredObject;

    constructor(initialData: StoredObject = {}) {
        this.data = initialData;
    }

    public async read(path: string): Promise<StoredValue> {
        throw new Error('Not implemented');
    }

    public async write(path: string, value: StoredValue): Promise<void> {
        throw new Error('Not implemented');
    }

    public async observe(path: string, callback: ObserverCallback): Promise<void> {
        throw new Error('Not implemented');
    }
}
