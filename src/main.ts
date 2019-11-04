import { once } from "events";
import { createInterface } from "readline";
import { LogStore } from "./models/LogStore";
import { loadFile } from "./utils/LoadFile";
import { processLine } from "./utils/ProcessLine";

export const main = async (drivingLogPath: string): Promise<void> => {
  if (!drivingLogPath) {
    throw new Error('Invalid log path provided');
  }

  try {
    // Load the with read stream
    const stream = await loadFile(drivingLogPath);

    // Open new log store
    const store = new LogStore();

    // Create readline interface
    const logData = createInterface({
      crlfDelay: Infinity,
      input: stream
    });

    // Process each line
    logData.on("line", (line: string) => processLine({ line, store }));

    // Wait for the file to finish streaming
    await once(logData, "close");

    // Make sure read stream is closed
    stream.close();

    // Output the report
    for (const driver of store.drivers) {
      console.log(driver.generateRecord());
    }
  } catch (error) {
    console.error("An error occurred while generating report");

    throw error;
  }
};
