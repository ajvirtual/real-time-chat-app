/**
 * Try parse string to float
 * @param str 
 * @returns number parsed. Return 0 if something go wrong
 */
export const try_parse_float = (str: string) : number => {
    try {
        var result = parseFloat(str)
        return isNaN(result) ? 0 : result
    } catch(e) {
        return 0
    }
}

/**
 * Try to return number with fractionDigit precision
 * @param number 
 * @param fractionDigit 
 * @returns number parsed. Return the variable if something go wrong
 */
export const try_to_fixed = (number: number, fractionDigit?: number) : string | number => {
    try {
        return number.toFixed(fractionDigit)
    } catch(e) {
        return number
    }
}

/**
 * Try to parse string to json
 * @param str 
 * @returns JSON object. Return empty object if something go wrong
 */
export const try_parse_json = (str: string): JSON | {} => {
    try{
        return JSON.parse(str)
    }catch(e){
        return {}
    }
}

/**
 * Check if string is a valid json
 * @param str 
 * @returns result
 */
export const is_valid_json = (str: string): boolean => {
    try{
        JSON.parse(str)
        return true
    }catch(e){
        return false
    }
}

export const get_clone = (obj: Record<string, any> ): Date | Object | Array<unknown> | unknown => {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        const copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        const copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = get_clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        const copy: Record<string, any> = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = get_clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export const is_thenable = (obj: Record<string, unknown>) => {

    if (!obj) {
        return false
    }

    return (obj.then && typeof obj.then === 'function')
}