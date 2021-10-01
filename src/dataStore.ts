export type StoredValue = string | number | boolean | undefined | StoredObject;
export type StoredObject = { [key: string]: StoredValue };

export type ObserverCallback = (value: StoredValue) => void;

export default interface DataStore {
    read(path: string): Promise<StoredValue>;
    write(path: string, value: StoredValue): Promise<void>;
    observe(path: string, callback: ObserverCallback): Promise<void>;
}
