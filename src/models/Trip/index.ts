import { ITripParams } from '../../interfaces/ITripParams';

export class Trip {
  private _start: Date;
  private _end: Date;
  private _distance: number;

  constructor({ start, end, distance }: ITripParams) {
    if (Object.prototype.toString.call(start) !== "[object Date]") {
      throw new Error("Start date of trip must be a Date object");
    }

    this._start = start;

    if (Object.prototype.toString.call(end) !== "[object Date]") {
      throw new Error("End date of trip must be a Date object");
    }

    this._end = end;

    if (typeof distance !== "number") {
      throw new Error("Distance of trip must be a number");
    }

    this._distance = distance;
  }

  get duration(): number {
    const millisecondsDuration = this._end.getTime() - this._start.getTime();

    return millisecondsDuration / 3600000;
  }

  get distance(): number {
    return this._distance;
  }
}
