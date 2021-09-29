export type StoredValue = string | number | boolean | object | undefined;

export type ListenerCallback = (value: StoredValue) => void;

export default interface DataStore {
    read(path: string): Promise<StoredValue>;
    write(path: string, value: StoredValue): Promise<void>;
    addListener(path: string, callback: ListenerCallback): Promise<void>;
}
