import { Driver } from "../../models/Driver";
import { LogStore } from "../../models/LogStore";
import { Trip } from "../../models/Trip";
import { parseTimeString } from "../../utils/ParseTimeString";

enum COMMANDS {
  ADD_DRIVER = "DRIVER",
  ADD_TRIP = "TRIP"
}

export const processLine = ({
  line,
  store
}: {
  line: string;
  store: LogStore;
}): void => {
  const [cmd, driverName, startTime, endTime, distance]: string[] = line.split(
    " "
  );

  if (!driverName) {
    throw new Error("No driver name provided");
  }

  const upperCMD = cmd.toUpperCase();

  const driver = store.getDriverByName(driverName);

  if (upperCMD === COMMANDS.ADD_DRIVER) {
    if (!driver) {
      // If we get an add driver command and the driver doesn't already exist, then create
      store.addDriver(
        new Driver(driverName, { reportingThreshold: { min: 5, max: 100 } })
      );
    }

    return;
  }

  if (upperCMD === COMMANDS.ADD_TRIP) {
    if (!driver) {
      throw new Error("Cannot add trip to nonexistent driver");
    }

    if (!distance || isNaN(parseFloat(distance))) {
      throw new Error("Invalid distance provided");
    }

    const start = parseTimeString(startTime);
    const end = parseTimeString(endTime);

    const trip = new Trip({ start, end, distance: parseFloat(distance) });

    driver.addTrip(trip);

    return;
  }

  throw new Error("Invalid command provided");
};
