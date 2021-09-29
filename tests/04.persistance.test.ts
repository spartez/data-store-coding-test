import { promises as fsp } from 'fs';
import { resolve } from 'path';
const { copyFile, readFile, unlink } = fsp;
import FileStore from '../src/fileStore';

const SAMPLE_FILE = resolve(__dirname, 'data.sample.json');
const DATA_FILE = resolve(__dirname, 'data.json');
const NON_EXISTING_FILE = resolve(__dirname, 'new-data.json');

describe('realtime database', () => {
    let db: FileStore;

    beforeEach(async () => {
        await copyFile(SAMPLE_FILE, DATA_FILE);
        try {
            await unlink(NON_EXISTING_FILE);
        } catch (error) {}
        db = new FileStore(DATA_FILE);
    });

    it('read value from file', async () => {
        expect(await db.read('foo/bar')).toBe('test');
    });

    it('saves value to file', async () => {
        await db.update('foo', { bar: 42 });

        const data = await readFile(DATA_FILE);
        expect(JSON.parse(data.toString())).toStrictEqual({
            foo: {
                bar: 42,
            },
        });
    });

    it(`creates new file if it doesn't exist`, async () => {
        const emptyDb = new FileStore(NON_EXISTING_FILE);

        expect(await emptyDb.read('foo/bar')).toBe(undefined);

        await emptyDb.update('foo', { bar: 42 });

        const data = await readFile(NON_EXISTING_FILE);
        expect(JSON.parse(data.toString())).toStrictEqual({
            foo: {
                bar: 42,
            },
        });
    });
});
