import { parseTimeString } from '../../src/utils/ParseTimeString';
import { TIME_STRING } from "../constants";

const PARSING_ERROR = 'Invalid time string provided';

test('Utils | ParseTimeString | Can process time string', () => {
  expect.assertions(3);

  const date = parseTimeString(TIME_STRING);

  expect(date).toBeInstanceOf(Date);
  expect(date.getHours()).toBe(8);
  expect(date.getMinutes()).toBe(0);
});

test('Utils | ParseTimeString | Will throw error if no time string provided', () => {
  expect(() => parseTimeString(null)).toThrowError(PARSING_ERROR);
});

test('Utils | ParseTimeString | Will throw error if invalid string provided', () => {
  expect(() => parseTimeString('j19283ej')).toThrowError(PARSING_ERROR);
});
