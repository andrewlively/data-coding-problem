import { ReadStream } from 'fs';
import { resolve } from 'path';
import { loadFile } from '../../src/utils/LoadFile';

test('Utils | LoadFile | Will load file with correct path', async () => {
  const testFilePath = resolve(__dirname, '..', 'test.txt');

  const stream = await loadFile(testFilePath);

  expect(stream).toBeInstanceOf(ReadStream);
});

test('Utils | LoadFile | Will throw error when file at path does not exist', async () => {
  const badTestFilePath = resolve('./bad_file');

  expect.assertions(1);

  try {
    await loadFile(badTestFilePath);
  } catch (error) {
    expect(error).toEqual(new Error('No file found at specified path'));
  }
});
