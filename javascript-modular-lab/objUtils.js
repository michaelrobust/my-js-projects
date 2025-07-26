let deepEquality = (obj1, obj2) => {
    // Error checking
    if (obj1 === undefined || obj2 === undefined) throw "Both objects are required";
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || Array.isArray(obj1) || Array.isArray(obj2) || obj1 === null || obj2 === null) {
        throw "Both parameters must be objects";
    }
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) {
        return false;
    }
    
    for (let key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
        
        const val1 = obj1[key];
        const val2 = obj2[key];
        
        if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null && !Array.isArray(val1) && !Array.isArray(val2)) {
            if (!deepEquality(val1, val2)) {
                return false;
            }
        } else if (val1 !== val2) {
            return false;
        }
    }
    
    return true;
};

let commonKeysValues = (obj1, obj2) => {
    // Error checking
    if (obj1 === undefined || obj2 === undefined) throw "Both objects are required";
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || Array.isArray(obj1) || Array.isArray(obj2) || obj1 === null || obj2 === null) {
        throw "Both parameters must be objects";
    }
    
    const result = {};
    
    const findCommonPairs = (o1, o2, resultObj) => {
        for (let key in o1) {
            if (key in o2) {
                const val1 = o1[key];
                const val2 = o2[key];
                
                if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null && !Array.isArray(val1) && !Array.isArray(val2)) {
                    if (deepEquality(val1, val2)) {
                        resultObj[key] = val1;
                    }
                    findCommonPairs(val1, val2, resultObj);
                } else if (val1 === val2) {
                    resultObj[key] = val1;
                }
            }
        }
    };
    
    findCommonPairs(obj1, obj2, result);
    
    return result;
};

let calculateObject = (object, func) => {
    // Error checking
    if (object === undefined) throw "Object parameter is required";
    if (typeof object !== 'object' || Array.isArray(object) || object === null) {
        throw "First parameter must be an object";
    }
    if (func === undefined) throw "Function parameter is required";
    if (typeof func !== 'function') throw "Second parameter must be a function";
    
    for (let key in object) {
        if (typeof object[key] !== 'number') {
            throw "All object values must be numbers";
        }
    }
    
    const result = {};
    
    for (let key in object) {
        const transformedValue = func(object[key]);
        const sqrtValue = Math.sqrt(transformedValue);
        result[key] = parseFloat(sqrtValue.toFixed(2));
    }
    
    return result;
};

module.exports = {
    deepEquality,
    commonKeysValues,
    calculateObject
};