import { createReadStream, exists as existsCB, ReadStream } from "fs";
import { resolve } from "path";
import { promisify } from "util";

const exists = promisify(existsCB);

export const loadFile = async (path: string): Promise<ReadStream> => {
  // Resolve full path to the file
  const resolvedPath = resolve(path);

  // Check if the file exists
  const fileExists = await exists(resolvedPath);

  // Let the user know if the file at specified path does not exist
  if (!fileExists) {
    return Promise.reject(new Error("No file found at specified path"));
  }

  // Open a read stream of specified file
  const stream = createReadStream(resolvedPath);

  return Promise.resolve(stream);
};
