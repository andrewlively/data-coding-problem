import { Driver } from '../../src/models/Driver';
import { LogStore } from '../../src/models/LogStore';
import { DRIVER_NAME } from '../constants';

test('Models | LogStore | Can create log store', () => {
  const store = new LogStore();

  expect(store.drivers.length).toBe(0);
});

test('Models | LogStore | Can add driver to log store', () => {
  const store = new LogStore();

  const driver = new Driver(DRIVER_NAME);

  store.addDriver(driver);

  expect(store.drivers.length).toBe(1);
});

test('Models | LogStore | Will throw error when trying to add invalid Driver', () => {
  const store = new LogStore();

  expect(() => store.addDriver(null)).toThrowError('Invalid driver provided');
});

test('Models | LogStore | Will return Driver from store by name', () => {
  const store = new LogStore();

  const driver = new Driver(DRIVER_NAME);

  store.addDriver(driver);

  const foundDriver = store.getDriverByName(DRIVER_NAME);

  expect(foundDriver.name).toBe(DRIVER_NAME);
});

test('Models | LogStore | Will return "undefined" if can\'t find driver in store', () => {
  const store = new LogStore();

  expect(store.getDriverByName(DRIVER_NAME)).toBeUndefined();
});

test('Models | LogStore | Will return correct drivers', () => {
  const store = new LogStore();

  const driver = new Driver(DRIVER_NAME);

  store.addDriver(driver);

  expect(store.drivers).toEqual([ driver ]);
});
