import { IDriverOptions } from "../../interfaces/IDriverOptions";
import { Trip } from "../Trip";

export class Driver {
  private _name: string;
  private _trips: Trip[];
  private reportingMin: number;
  private reportingMax: number;

  constructor(name: string, options?: IDriverOptions) {
    if (!name) {
      throw new Error("Must provide name when creating a driver");
    }

    this._name = name;
    this._trips = [];

    this.reportingMin =
      options && options.reportingThreshold
        ? options.reportingThreshold.min || 5
        : 5;
    this.reportingMax =
      options && options.reportingThreshold
        ? options.reportingThreshold.max || 100
        : 100;
  }

  get name(): string {
    return this._name;
  }

  public addTrip(trip: Trip): void {
    if (!trip) {
      throw new Error("Invalid trip provided");
    }

    this._trips.push(trip);
  }

  get trips(): Trip[] {
    return this._trips.filter(trip => {
      const avgTripSpeed = Math.round(trip.distance / trip.duration);

      return (
        this.reportingMin <= avgTripSpeed && avgTripSpeed <= this.reportingMax
      );
    });
  }

  get averageSpeed(): number {
    const avgSpeed = this.totalDistance / (this.totalTime || 1) || 0;

    return Math.round(avgSpeed);
  }

  get totalDistance(): number {
    const totalDistance = this.trips.reduce(
      (runningDistance: number, trip: Trip) => runningDistance + trip.distance,
      0
    );

    return Math.round(totalDistance);
  }

  get totalTime(): number {
    return this.trips.reduce(
      (runningTotal: number, trip: Trip) => runningTotal + trip.duration,
      0
    );
  }

  public generateRecord(): string {
    let reportLine = `${this.name}: ${this.totalDistance} miles`;

    if (this.averageSpeed > 0) {
      reportLine += ` @ ${this.averageSpeed} mph`;
    }

    return reportLine;
  }
}
