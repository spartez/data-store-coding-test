import DataStore from './dataStore';
import InMemoryStore from './inMemoryStore';

export default class FileStore extends InMemoryStore implements DataStore {
    constructor(filePath: string) {
        super();
    }
}
