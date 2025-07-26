let camelCase = (str) => {
    // Error checking
    if (str === undefined) throw "String parameter is required";
    if (typeof str !== 'string') throw "Parameter must be a string";
    if (str.length === 0) throw "String cannot be empty";
    
    // Split by spaces, convert to camelCase
    const words = str.trim().split(/\s+/);
    let result = words[0].toLowerCase();
    
    for (let i = 1; i < words.length; i++) {
        result += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    
    return result;
};

let replaceCharsAtIndexes = (str, idxArr) => {
    // Error checking
    if (str === undefined) throw "String parameter is required";
    if (typeof str !== 'string') throw "First parameter must be a string";
    if (str.length === 0) throw "String cannot be empty";
    if (str.trim().length === 0) throw "String cannot be just empty spaces";
    if (!Array.isArray(idxArr)) throw "Second parameter must be an array";
    
    for (let idx of idxArr) {
        if (typeof idx !== 'number' || idx < 1 || idx >= str.length - 1) {
            throw "Each index must be a number greater than 0 and less than string length minus 1";
        }
    }
    
    let result = str;
    
    for (let idx of idxArr) {
        const targetChar = str.charAt(idx);
        const beforeChar = str.charAt(idx - 1);
        const afterChar = str.charAt(idx + 1);
        
        // Replace all future occurrences of targetChar
        let newResult = '';
        let isAlternating = false;
        
        for (let i = 0; i < result.length; i++) {
            if (result.charAt(i) === targetChar && i > idx) {
                newResult += isAlternating ? afterChar : beforeChar;
                isAlternating = !isAlternating;
            } else {
                newResult += result.charAt(i);
            }
        }
        
        result = newResult;
    }
    
    return result;
};

let compressString = (str) => {
    // Error checking
    if (str === undefined) throw "String parameter is required";
    if (typeof str !== 'string') throw "Parameter must be a string";
    if (str.length === 0) throw "String cannot be empty";
    if (str.trim().length === 0) throw "String cannot be just spaces";
    
    let result = '';
    let count = 1;
    
    for (let i = 0; i < str.length; i++) {
        if (i < str.length - 1 && str[i] === str[i + 1]) {
            count++;
        } else {
            if (count > 1) {
                result += str[i] + count;
            } else {
                result += str[i];
            }
            count = 1;
        }
    }
    
    return result;
};

module.exports = {
    camelCase,
    replaceCharsAtIndexes,
    compressString
};