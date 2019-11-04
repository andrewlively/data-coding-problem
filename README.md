# Data Coding Problem

Contained in this repo is my ([Andrew Lively](https://github.com/andrewlively)) solution to a data coding problem.

## Built with

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io/)

## System Requirements

- [Node.js](https://nodejs.org) (^10.16.0)
- [npm](https://www.npmjs.com) (^6.9.0)

## Setup

### 1. Install dependencies

All project dependences are managed using [npm](https://npmjs.com). While not required, you could substitute [npm](https://npmjs.com) for [yarn](https://yarnpkg.com).

NOTE: The dependencies for this project are only necessary required for development/building the project. At runtime the only dependency for this project are the built-in Node.js modules.

```shell
$ npm install # Using npm
```

or

```shell
$ yarn # Using yarn
```


### 2. Compile TypeScript

```shell
$ npm run compile
```

or

```shell
$ yarn compile
```

## Usage

This program accepts an argument which is the path to the driving history log file. To execute the program, it can be called like so:

```shell
$ node build/index.js <PATH_TO_THE_HISTORY_LOG_FILE>
```

## Running test

This application uses unit, integration, and acceptance tests defined in the `__tests__` directory and executed using [Jest](https://jestjs.io/). To run the test suite, run:

```shell
$ npm test
```

or

```shell
$ yarn test
```

## Approach

My approach to this problem was to break it down into four parts:

- Data modeling
- Input consumption
- Output
- Testing

### Data modeling

After reviewing the provided example input, I broke down the data into three structures:

- LogStore
- Driver
- Trip

#### LogStore Model

The highest level model is the LogStore model which maintains all of the data from the provided input. At a high level, this model exposes:

- `addDriver(driver: Driver) => void`
  - Allows the program to add/register a new `Driver` to the internal `Driver[]` store
  - Internally this is implemented as an `Array` to take advantage of powerful methods like `.filter()`, `.sort()`, and `.reduce()`

- `getDriverByName(name: string) => Driver | undefined`
  - Allows the program to easily find an existing `Driver` in the internal `Driver`[] store using the `Driver` name property as the key
  - When searching for existing `Driver`s, the names are all converted to upper case, so `Dave` and `dave` are treated as the same driver

- `getter drivers`
  - Exposes a getter which allows access to the internal `Driver[]` store, but ensures sorting by `totalDistance`

#### Driver Model

The `Driver` model, which is the core data structure for this problem, has a `name` property which also doubles as the key. In addition to the `name` property, `IDriverOptions` (optional) can be provided in the constructor to set the min/max average speed threshold for trips to use in reporting. The `Driver` exposes several methods for the application to use:

- `getter name`
  - Returns the raw `Driver` name

- `addTrip(trip: Trip) => void`
  - Allows the program to add a new `Trip` for this driver
  - Internally this is implemented as an `Array` to take advantage of powerful methods like `.filter()`, `.sort()`, and `.reduce()`

- `getter trips`
  - Exposes a getter while allows access to the internal `Trip[]` store of the driver, but applies a filter to only return those trips which have an average speed inside the provided threshold
  - I used this `getter` and internal `Trip[]` store to make sure I was storing all provided data (even though the problem statement said to discard those outside the threshold) and not losing anything. If the threshold then changed in the future, it would be a simple adjustment to the `IDriverOptions`

- `getter totalDistance`
  - Exposes a getter to calculate the total distance using the filtered trips

- `getter totalTime`
  - Exposes a getter to calculate the total time using the filtered trips

- `generateRecord() => string`
  - Returns the `Driver` record as a string in the format `NAME: TOTAL_DISTANCE miles @ AVERAGE_SPEED mph`

#### Trip Model

The `Trip` model is the lowest level data structure and is used to store the `start`, `end`, and `distance` of each `Trip`. The model takes in those values then exposes:

- `getter duration`
  - Exposes a getter to calculate the `Trip` duration using the provided `start` and `end` date
  - While the duration calculation is done in milliseconds, the returned result is in hours

- `getter distance`
  - Exposes a getter to the internal `distance` value

### Input consumption

Of the two input options allowed, for this problem I decided to use the second method of consuming a file path as an argument as it is a little easier to work with and build tests around in Node.js. In this application the data input flow looks like this:

1. Program is executed with the file path as an argument

```shell
$ node build/index.js <PATH_TO_THE_HISTORY_LOG_FILE>
```

2. The program then checks if the file exists

```typescript
// Resolve full path to the file
const resolvedPath = resolve(path);

// Check if the file exists
const fileExists = await exists(resolvedPath);
```

3. If the file exists, a [`ReadStream`](https://nodejs.org/api/stream.html) is opened so that the file can be read line by line without loading the whole file into memory

```typescript
// Open a read stream of specified file
const stream = createReadStream(resolvedPath);
```

4. The file is then asynchronously line by line and processed using the `processLine()` function

```typescript
// Create readline interface
const logData = createInterface({
  crlfDelay: Infinity,
  input: stream
});

// Process each line
logData.on("line", (line: string) => processLine({ line, store }));
```

5. Inside the `processLine()` function, I then have to determine:
  - What the command is and if it is valid
  - What data is being provided
  - Then call the correct function

```typescript
// See src/utils/ProcessLine/index.ts
```

Once this is done the inputted data will have all been consumed, loaded it into the `LogStore`, and now ready for output into a report.

### Output

The desired output for this problem is to have each `Driver`'s record printed on a separate line and sorted by `totalDistance`. Because of the work done previously with the `getter drivers` on the `LogStore` model and the `generateRecord()` method on the `Driver` model, this is a very straightforward process to complete, like so:

```typescript
for (const driver of store.drivers) {
  console.log(driver.generateRecord());
}
```

Note: While we could call `process.stdout.write()` to write to `stdout` directly, `console.log` also writes to `stdout` and automatically puts each call on a separate line. `console.log` is also much easier to mock in the tests, so that made it the easy choice to use here.

### Testing

For testing this application, I used [Jest](https://jestjs.io/) since it is a fast, easy to use testing framework with great TypeScript support. My approach to testing this application was to first build out unit tests for the methods that were exposed by the models and utils. Once I had those covered I then moved up to integration tests which relied on combining multiple functions together. Lastly I built acceptance tests to ensure given a known input I recieved an exact output that matched problem output requirements. Additionaly, using the `--coverage` feature to build a coverage report and make sure I had as much as possible covered. And while not all are at 100%, the tests are in a place where I feel comfortable deploying this code and if any breaking changes were to be made to the code, the tests would immediately point that out. 
