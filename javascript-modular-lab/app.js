const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

console.log('=== Testing arrayUtils.js ===\n');

// arrayStats Tests
console.log('Testing arrayStats:');
try {
    // Should Pass
    const result1 = arrayUtils.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20]);
    console.log('arrayStats passed successfully');
    console.log('Result:', result1);
} catch (e) {
    console.error('arrayStats failed test case');
}

try {
    // Should Fail
    const result2 = arrayUtils.arrayStats("banana");
    console.error('arrayStats did not error');
} catch (e) {
    console.log('arrayStats failed successfully');
}

// mergeCommonElements Tests
console.log('\nTesting mergeCommonElements:');
try {
    // Should Pass
    const result3 = arrayUtils.mergeCommonElements([3, 4, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3]);
    console.log('mergeCommonElements passed successfully');
    console.log('Result:', result3);
} catch (e) {
    console.error('mergeCommonElements failed test case');
}

try {
    // Should Fail
    const result4 = arrayUtils.mergeCommonElements([1, 2, 3], "string", [4, 5, 6]);
    console.error('mergeCommonElements did not error');
} catch (e) {
    console.log('mergeCommonElements failed successfully');
}

// numberOfOccurrences Tests
console.log('\nTesting numberOfOccurrences:');
try {
    // Should Pass
    const result5 = arrayUtils.numberOfOccurrences([1, 2, 3], [4,5,6,1], [2,5,6,3]);
    console.log('numberOfOccurrences passed successfully');
    console.log('Result:', result5);
} catch (e) {
    console.error('numberOfOccurrences failed test case');
}

try {
    // Should Fail
    const result6 = arrayUtils.numberOfOccurrences();
    console.error('numberOfOccurrences did not error');
} catch (e) {
    console.log('numberOfOccurrences failed successfully');
}

console.log('\n=== Testing stringUtils.js ===\n');

// camelCase Tests
console.log('Testing camelCase:');
try {
    // Should Pass
    const result7 = stringUtils.camelCase('my function rocks');
    console.log('camelCase passed successfully');
    console.log('Result:', result7);
} catch (e) {
    console.error('camelCase failed test case');
}

try {
    // Should Fail
    const result8 = stringUtils.camelCase('');
    console.error('camelCase did not error');
} catch (e) {
    console.log('camelCase failed successfully');
}

// replaceCharsAtIndexes Tests
console.log('\nTesting replaceCharsAtIndexes:');
try {
    // Should Pass
    const result9 = stringUtils.replaceCharsAtIndexes("Daddy", [2]);
    console.log('replaceCharsAtIndexes passed successfully');
    console.log('Result:', result9);
} catch (e) {
    console.error('replaceCharsAtIndexes failed test case');
}

try {
    // Should Fail
    const result10 = stringUtils.replaceCharsAtIndexes("foobar", [0]);
    console.error('replaceCharsAtIndexes did not error');
} catch (e) {
    console.log('replaceCharsAtIndexes failed successfully');
}

// compressString Tests
console.log('\nTesting compressString:');
try {
    // Should Pass
    const result11 = stringUtils.compressString("aaabbccc");
    console.log('compressString passed successfully');
    console.log('Result:', result11);
} catch (e) {
    console.error('compressString failed test case');
}

try {
    // Should Fail
    const result12 = stringUtils.compressString("");
    console.error('compressString did not error');
} catch (e) {
    console.log('compressString failed successfully');
}

console.log('\n=== Testing objectUtils.js ===\n');

// deepEquality Tests
console.log('Testing deepEquality:');
try {
    // Should Pass
    const first = {a: 2, b: 3};
    const third = {a: 2, b: 3};
    const result13 = objUtils.deepEquality(first, third);
    console.log('deepEquality passed successfully');
    console.log('Result:', result13);
} catch (e) {
    console.error('deepEquality failed test case');
}

try {
    // Should Fail
    const result14 = objUtils.deepEquality([1,2,3], [1,2,3]);
    console.error('deepEquality did not error');
} catch (e) {
    console.log('deepEquality failed successfully');
}

// commonKeysValues Tests
console.log('\nTesting commonKeysValues:');
try {
    // Should Pass
    const first = {name: {first: "Patrick", last: "Hill"}, age: 46};
    const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
    const result15 = objUtils.commonKeysValues(first, second);
    console.log('commonKeysValues passed successfully');
    console.log('Result:', result15);
} catch (e) {
    console.error('commonKeysValues failed test case');
}

try {
    // Should Fail
    const result16 = objUtils.commonKeysValues([1,2,3], [1,2,3]);
    console.error('commonKeysValues did not error');
} catch (e) {
    console.log('commonKeysValues failed successfully');
}

// calculateObject Tests
console.log('\nTesting calculateObject:');
try {
    // Should Pass
    const result17 = objUtils.calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('calculateObject passed successfully');
    console.log('Result:', result17);
} catch (e) {
    console.error('calculateObject failed test case');
}

try {
    // Should Fail
    const result18 = objUtils.calculateObject({ a: "string", b: 7 }, n => n * 2);
    console.error('calculateObject did not error');
} catch (e) {
    console.log('calculateObject failed successfully');
}

console.log('\n=== All Tests Complete ===');