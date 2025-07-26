let arrayStats = (array) => {
    // Error checking
    if (array === undefined) throw "Array parameter is required";
    if (!Array.isArray(array)) throw "Parameter must be an array";
    if (array.length === 0) throw "Array cannot be empty";
    
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') throw "All array elements must be numbers";
    }
    
    // Sort array from lowest to highest
    const sortedArray = [...array].sort((a, b) => a - b);
    
    // Calculate stats
    const count = sortedArray.length;
    const sum = sortedArray.reduce((acc, num) => acc + num, 0);
    const mean = sum / count;
    const minimum = sortedArray[0];
    const maximum = sortedArray[count - 1];
    const range = maximum - minimum;
    
    // Calculate median
    let median;
    if (count % 2 === 0) {
        median = (sortedArray[count / 2 - 1] + sortedArray[count / 2]) / 2;
    } else {
        median = sortedArray[Math.floor(count / 2)];
    }
    
    // Calculate mode
    const frequency = {};
    for (let num of array) {
        frequency[num] = (frequency[num] || 0) + 1;
    }
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
        .filter(key => frequency[key] === maxFreq)
        .map(key => parseFloat(key))
        .sort((a, b) => a - b);
    
    let mode;
    if (maxFreq === 1) {
        mode = 0;
    } else if (modes.length === 1) {
        mode = modes[0];
    } else {
        mode = modes;
    }
    
    return {
        mean: mean,
        median: median,
        mode: mode,
        range: range,
        minimum: minimum,
        maximum: maximum,
        count: count,
        sum: sum
    };
};

let mergeCommonElements = (...arrays) => {
    //this function takes in a variable number of arrays that's what the ...arrays signifies
    
    // Error checking
    if (arrays.length < 2) throw "At least two arrays must be provided";
    
    for (let i = 0; i < arrays.length; i++) {
        if (!Array.isArray(arrays[i])) throw "All arguments must be arrays";
        if (arrays[i].length === 0) throw "Arrays cannot be empty";
    }
    
    // Flatten and validate arrays
    const flattenArray = (arr) => {
        const result = [];
        for (let item of arr) {
            if (Array.isArray(item)) {
                result.push(...flattenArray(item));
            } else if (typeof item === 'string' || typeof item === 'number') {
                result.push(item);
            } else {
                throw "Array elements must be strings, numbers, or arrays containing strings/numbers";
            }
        }
        return result;
    };
    
    const flattenedArrays = arrays.map(arr => flattenArray(arr));
    
    // Find common elements
    const commonElements = flattenedArrays[0].filter(element => {
        return flattenedArrays.every(arr => arr.includes(element));
    });
    
    // Remove duplicates and sort
    const uniqueCommon = [...new Set(commonElements)];
    
    // Sort numbers first, then strings
    const numbers = uniqueCommon.filter(item => typeof item === 'number').sort((a, b) => a - b);
    const strings = uniqueCommon.filter(item => typeof item === 'string').sort();
    
    return [...numbers, ...strings];
};

let numberOfOccurrences = (...arrays) => {
    //this function takes in a variable number of arrays that's what the ...arrays signifies
    
    // Error checking
    if (arrays.length === 0) throw "At least one array must be provided";
    
    for (let arr of arrays) {
        if (!Array.isArray(arr)) throw "All arguments must be arrays";
        if (arr.length === 0) throw "Arrays cannot be empty";
        
        for (let element of arr) {
            if (typeof element === 'string') {
                if (!/^[a-zA-Z]+$/.test(element)) {
                    throw "String elements must contain only letters";
                }
            } else if (typeof element !== 'number') {
                throw "Array elements must be numbers or strings containing only letters";
            }
        }
    }
    
    const occurrences = {};
    
    for (let arr of arrays) {
        for (let element of arr) {
            const key = element.toString();
            occurrences[key] = (occurrences[key] || 0) + 1;
        }
    }
    
    return occurrences;
};

module.exports = {
    arrayStats,
    mergeCommonElements,
    numberOfOccurrences
};