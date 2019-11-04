import { Trip } from '../../src/models/Trip';
import { DRIVER_NAME, ONE_HOUR } from '../constants';

test('Models | Trip | Can create trip', () => {
  const now = new Date();

  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + (ONE_HOUR * 1.5));
  const distance = 25;

  const trip = new Trip({ start, end, distance });

  expect(trip.distance).toBe(distance);
});

test('Models | Trip | Will throw error if invalid start date provided', () => {
  const now = new Date();

  const end = new Date(now.getTime() + (ONE_HOUR * 1.5));
  const distance = 25;

  const error = new Error('Start date of trip must be a Date object');

  // @ts-ignore
  expect(() => new Trip({ end, distance })).toThrowError(error);
});

test('Models | Trip | Will throw error if invalid end date provided', () => {
  const now = new Date();

  const start = new Date(now.getTime());
  const distance = 25;

  const error = new Error('End date of trip must be a Date object');

  // @ts-ignore
  expect(() => new Trip({ start, distance })).toThrowError(error);
});

test('Models | Trip | Will throw error if invalid start date provided', () => {
  const now = new Date();

  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + (ONE_HOUR * 1.5));

  const error = new Error('Distance of trip must be a number');

  // @ts-ignore
  expect(() => new Trip({ start, end })).toThrowError(error);
});

test('Models | Trip | Will calculate correct duration', () => {
  const now = new Date();
  const duration = 1.5;

  const start = new Date(now.getTime());
  const end = new Date(now.getTime() + (ONE_HOUR * duration));
  const distance = 25;

  const trip = new Trip({ start, end, distance });

  expect(trip.duration).toBe(duration);
});
