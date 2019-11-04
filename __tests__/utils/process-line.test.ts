import { LogStore } from '../../src/models/LogStore';
import { processLine } from '../../src/utils/ProcessLine';
import { DRIVER_LOG_LINE, TRIP_LOG_LINE, DRIVER_NAME } from "../constants";

test('Utils | ProcessLine | Can process Driver line', () => {
  const store = new LogStore();

  processLine({ line: DRIVER_LOG_LINE, store });

  expect(store.drivers.length).toBe(1);
});

test('Utils | ProcessLine | Can process Trip line', () => {
  expect.assertions(2);

  const store = new LogStore();

  processLine({ line: DRIVER_LOG_LINE, store });
  processLine({ line: TRIP_LOG_LINE, store });

  expect(store.drivers.length).toBe(1);
  expect(store.drivers[0].trips.length).toBe(1);
});

test('Utils | ProcessLine | Will throw error if trying to add trip before adding driver', () => {
  const store = new LogStore();

  expect(() => processLine({ line: TRIP_LOG_LINE, store })).toThrowError('Cannot add trip to nonexistent driver');
});

test('Utils | ProcessLine | Will throw error if trying to add driver with no name', () => {
  const store = new LogStore();

  expect(() => processLine({ line: `Driver `, store })).toThrowError('No driver name provided');
});

test('Utils | ProcessLine | Will throw error if trying to use invalid command', () => {
  const store = new LogStore();

  expect(() => processLine({ line: `BAD_COMMAND Test`, store })).toThrowError('Invalid command provided');
});
