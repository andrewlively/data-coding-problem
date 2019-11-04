import { resolve } from 'path';
import { main } from '../src/main';

test('Main | Can open and process file', async () => {
  const testFilePath = resolve(__dirname, 'test.txt');

  const spy = jest.spyOn(global.console, 'log')

  await main(testFilePath);

  expect(spy.mock.calls).toEqual([
    [ 'Lauren: 42 miles @ 34 mph' ],
    [ 'Dan: 39 miles @ 47 mph' ],
    [ 'Kumi: 0 miles' ]
  ]);
});

test('Main | Will throw error if invalid file path is provided', async () => {
  expect.assertions(1);

  const testFilePath = resolve('./bad.txt');

  try {
    await main(testFilePath);
  } catch (error) {
    expect(error).toEqual(new Error('No file found at specified path'));
  }
});

test('Main | Will throw error if no file path is provided', async () => {
  expect.assertions(1);

  try {
    await main(null);
  } catch (error) {
    expect(error).toEqual(new Error('Invalid log path provided'));
  }
});
