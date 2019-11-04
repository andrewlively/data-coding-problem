import { Driver } from '../../src/models/Driver';
import { Trip } from '../../src/models/Trip';
import { DRIVER_NAME, DRIVER_OPTIONS, ONE_HOUR } from '../constants';

test('Models | Driver | Can create driver record', () => {
  const driver = new Driver(DRIVER_NAME);

  expect(driver.name).toBe(DRIVER_NAME);
});

test('Models | Driver | Will throw error if no driver name is provided', () => {
  // @ts-ignore
  expect(() => new Driver()).toThrowError(new Error('Must provide name when creating a driver'));
});

test('Models | Driver | Can add trip to driver', () => {
  const driver = new Driver(DRIVER_NAME, DRIVER_OPTIONS);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + (ONE_HOUR * 1.5));
  const distance = 25;

  const trip = new Trip({ start, end, distance });

  driver.addTrip(trip);

  expect(driver.trips).toEqual([ trip ]);
});

test('Models | Driver | Will throw error when trying to add invalid Trip', () => {
  const driver = new Driver(DRIVER_NAME);

  expect(() => driver.addTrip(null)).toThrowError('Invalid trip provided');
});

test('Models | Driver | Will ignore trips outside threshold', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);

  const trip0 = new Trip({ start, end, distance: 3 });
  const trip1 = new Trip({ start, end, distance: 25 });
  const trip2 = new Trip({ start, end, distance: 125 });

  driver.addTrip(trip0);
  driver.addTrip(trip1);
  driver.addTrip(trip2);

  expect(driver.trips.length).toBe(1);
});

test('Models | Driver | Can calculate getAverageSpeed with single trip', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);
  const distance = 25;

  const trip = new Trip({ start, end, distance });

  driver.addTrip(trip);

  expect(driver.averageSpeed).toBe(25);
});

test('Models | Driver | Can calculate getAverageSpeed of multiple trips', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);

  const trip0 = new Trip({ start, end, distance: 25 });
  const trip1 = new Trip({ start, end, distance: 75 });

  driver.addTrip(trip0);
  driver.addTrip(trip1);

  expect(driver.averageSpeed).toBe(50);
});

test('Models | Driver | Can calculate getTotalDistance with single trip', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);
  const distance = 25;

  const trip = new Trip({ start, end, distance });

  driver.addTrip(trip);

  expect(driver.totalDistance).toBe(25);
});

test('Models | Driver | Can calculate getTotalDistance of multiple trips', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);

  const trip0 = new Trip({ start, end, distance: 25 });
  const trip1 = new Trip({ start, end, distance: 75 });

  driver.addTrip(trip0);
  driver.addTrip(trip1);

  expect(driver.totalDistance).toBe(100);
});

test('Models | Driver | Can calculate total time with single trip', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);
  const distance = 25;

  const trip = new Trip({ start, end, distance });

  driver.addTrip(trip);

  expect(driver.totalTime).toBe(1);
});

test('Models | Driver | Can calculate total time of multiple trips', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);

  const trip0 = new Trip({ start, end, distance: 25 });
  const trip1 = new Trip({ start, end, distance: 75 });

  driver.addTrip(trip0);
  driver.addTrip(trip1);

  expect(driver.totalTime).toBe(2);
});

test('Models | Driver | Can generate record for single trip', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);

  const trip = new Trip({ start, end, distance: 25 });

  driver.addTrip(trip);

  expect(driver.generateRecord()).toBe(`${ DRIVER_NAME }: 25 miles @ 25 mph`);
});

test('Models | Driver | Can generate record for single trip', () => {
  const driver = new Driver(DRIVER_NAME);

  const now = new Date();
  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + ONE_HOUR);

  const trip0 = new Trip({ start, end, distance: 25 });
  const trip1 = new Trip({ start, end, distance: 75 });

  driver.addTrip(trip0);
  driver.addTrip(trip1);

  expect(driver.generateRecord()).toBe(`${ DRIVER_NAME }: 100 miles @ 50 mph`);
});
