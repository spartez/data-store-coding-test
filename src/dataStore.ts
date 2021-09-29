export type StoredValue = string | number | boolean | object | undefined;

export type ListenerCallback = (value: StoredValue) => void;

export default interface DataStore {
    addListener(path: string, callback: ListenerCallback): Promise<void>;
    read(path: string): Promise<StoredValue>;
    update(path: string, value: StoredValue): Promise<void>;
}
