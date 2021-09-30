# Data store coding test

## Introduction

Your task is to implement a simple data store with JSON-like structure, e.g.:

```
{
    foo: {
        bar: {
            baz: 42
        },
        hello: 'world'
    }
}
```

The data store interface is specified in `src/dataStore.ts` and it consists of 3 asynchronous methods:

- `read(path: string)` - should return a `Promise` with data located at `path`. Path is a concatenated list of keys separated with `.`, for example `foo.bar.baz` references data located at key `baz` of object `bar` nested in object `foo`. Duplicated `.` should not matter. If there's no value at `path` the method should return `Promise` with `undefined`.

- `write(path: string, value: StoredValue)` - should write `value` at given `path`. Value could be a primitive value (`string`, `number`, `boolean`), an `object` (with primitive values or other objects) or an `undefined` value. If `path` doesn't exist yet in the store it should be created. Writing at root path (empty string or `.`) should not be allowed.

- `observe(path: string, callback: ObserverCallback)` - should register a callback that will be called every time the value at `path` or any sub-paths is modified. It should be also called immediately after registering with the current value. For example if observer is registered for `foo.bar` path and later `foo.bar.baz` value is written the callback should be called.

For example, given the data structure shown above we should expect the following results:

- `read('foo.bar.baz') // 42`
- `read('foo.bar') // { baz: 42 }`
- `write('foo.bar', 'test'); read('foo') // { bar: 'test', hello: 'world' }`

## Implementation

There are two classes to be implemented:

- `InMemoryStore` - should keep the data in-memory.
- `FileStore` - should read and write the data to file.

## Tests

There are ordered test files in `tests/` folder, we strongly suggest that you fix them one by one:

1. `01.read.test` - tests `read` method of `InMemoryStore`
2. `02.write.test` - tests `write` method of `InMemoryStore`
3. `03.observe.test` - tests `observe` method of `InMemoryStore`
4. `04.file.test` - tests reading and saving to file by `FileStore`
