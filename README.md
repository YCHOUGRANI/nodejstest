# Instructions

This is a task of understanding and manipulating data. The data is example data that has come from our telephone system that describes certain events during the life of a phone call. The task is to turn the events into meaningful information that can be used to report on the calls, like call time and ring time.

Tests have been written for you to help test your code and to help you in the right direction. The tests can be found in the `tests` directory.

The file `src/eventsToConnections.js` contains a function that the tests call, so your code should start there.

You may use any packages you want from npm.

## Setup/installing

You will need [NodeJS](https://nodejs.org/en/) installed

```
npm install
```

## Running the testing

```
npm test
```

## Pseudocode/steps

1. Sort events
2. Flatten events parties
3. Find unique party ids
4. Initialise a connection for each party
5. Loop through flattened events for status info and times storing info against the connection for the party
6. Loop through connections and work out time differences and start/end time
# nodejstest
