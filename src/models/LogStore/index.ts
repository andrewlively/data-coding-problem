import { Driver } from "../Driver";

export class LogStore {
  private _drivers: Driver[];

  constructor() {
    this._drivers = [];
  }

  public addDriver(driver: Driver): void {
    if (!driver) {
      throw new Error("Invalid driver provided");
    }

    this._drivers.push(driver);
  }

  public getDriverByName(name: string): Driver | undefined {
    return this._drivers.find(
      driver => driver.name.toUpperCase() === name.toUpperCase()
    );
  }

  get drivers(): Driver[] {
    return this._drivers.sort(
      (a: Driver, b: Driver) => b.totalDistance - a.totalDistance
    );
  }
}
