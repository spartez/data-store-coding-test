import DataStore, { ListenerCallback, StoredValue } from './dataStore';

export default class InMemoryStore implements DataStore {
    constructor(initialData: any = {}) {}

    public async read(path: string): Promise<StoredValue> {
        throw new Error('Not implemented');
    }

    public async update(path: string, value: StoredValue): Promise<void> {
        throw new Error('Not implemented');
    }

    public async addListener(path: string, callback: ListenerCallback): Promise<void> {
        throw new Error('Not implemented');
    }
}
