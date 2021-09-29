# Data store coding test

## Introduction

Your task is to implement a simple data store with JSON-like structure, e.g.:

```
{
    foo: {
        bar: {
            baz: 42
        },
        other: 'test'
    }
}
```

The data store interface is specified in `src/dataStore.ts` and it consists of 3 asynchronous methods:

- `read(path: string)` - should return a `Promise` with data located at `path`. Path is a concatenated list of keys separated with `/`, for example `foo/bar/baz`. Duplicated `/` should not matter. If there's no value at `path` the method should return `Promise` with `undefined`.

- `write(path: string, value: StoredValue)` - should write `value` at given `path`. Value could be a primitive value (`string`, `number`, `boolean`), an `object` (with primitive values or other objects) or an `undefined` value. If `path` doesn't exist yet in the store it should be created. Writing at root path (`/`) should not be allowed.

- `addListener(path: string, callback: ListenerCallback)` - should register a callback that will be called every time the value at `path` or any sub-paths is modified. It should be also called immediately after registering with the current value. For example if listener is registered for `foo/bar` path and later `foo/bar/baz` value is written the callback should be called.

## Implementation

There are two classes to be implemented:

- `InMemoryStore` - should keep the data in-memory.
- `FileStore` - should read and write the data to file.

## Tests

There are four ordered test files in `tests/` folder, we suggest that you fix them one by one in order.
