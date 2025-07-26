# Async-data-lookup-lab

This lab demonstrates the use of asynchronous JavaScript functions to fetch, parse, and analyze JSON data from simulated external sources.

## Files

- `app.js`: Main entry point for running lookups and testing async logic
- `companies.js`: JSON-formatted company data used for lookups
- `people.js`: JSON-formatted personal records used for lookup reference
- `package.json`: Defines dependencies and scripts (e.g., `start`)

## Skills Demonstrated

- Asynchronous functions with `async/await`
- Error handling in network/data fetching
- Data joining and filtering
- Input validation

## Example

Looking up a person’s workplace from a company list via their SSN:
```js
const result = await whereDoTheyWork('299-63-8866');
// ➡️ returns: "John Smith works at XYZ Corp. He is a Project Manager."
