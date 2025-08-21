import { is_valid_json } from './Generic'
import Lorem from './Lorem'

/**
 * Check GET query and return it as object of key value
 * @protected
 * @param {String} uri 
 * @returns {Object}
 */
export const get_uri_query = (uri: string): Record<string, any> => {
    const search_params = new URLSearchParams(uri.replace(/.*\?(.*)/g, '$1'))
    const result: Record<string, any> = {}
    search_params.forEach((value: string, key: string, parent: URLSearchParams) => {
        result[key.replace(/\[\]$/, '')] = /\[\]$/.test(key) 
            ? parent.getAll(key).map((item) => (is_valid_json(item) ? JSON.parse(item) : item))
            : (is_valid_json(value) ? JSON.parse(value) : value)
    })
    return result
}
/**
* Transform object to uri GET query
* @param {object} data 
*/
export const get_url_encoded = (data?: Record<string, any>) : string => {
   let str = ''

   for(var prop in data){
       if(Array.isArray(data[prop])){
            const adr = data[prop] as Array<string>
            adr.forEach((item: string) => {
                const val = typeof item === 'string' ? item : JSON.stringify(item)
                str += `${prop}[]=${val}&`
            })
       }
       else if (data[prop]) {
           const val = typeof data[prop] === 'string' ? data[prop] : JSON.stringify(data[prop])
           str += `${prop}=${val}&`
       }
   }

   return str.substring(0, str.length - 1)
}

export const get_graphql_error_message = (e: any) => {
    return e?.response?.errors?.[0]?.message
}

export const get_uniqid = (pref?: string) => `${pref || ''}${Math.random().toString(36).substr(2, 9)}`

/**
	 * Returns a random element of the array
	 * @public
	 * @param a
	 * @return {*}
	 */
export const pick_one = (a: Array<any>) => {
    return a[random_number(0, a.length)]
}

/**
 * Generate a random latitude
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 * @public
 */
export const random_number = (min: number = 0, max: number = 1000) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const sprintf = (format: string, ...args: any) => {
    let i = 0;
    return format.replace(/%s/g, () => args[i++]);
}

export const uc_first = (str: string) => {
    let str_1 = str.substring(0, 1)
    return str_1.toUpperCase() + str.substring(1, str.length)
}

/**
 * Returns a random sentence
 * @public
 * @param {boolean} short Should return a short word - Default: false
 * @returns {string}
 */
export const generate_string = (short: boolean = false) => {
    const words = [pick_one(Lorem)];
    if (random_number(0, 2) >= 1) words.push(pick_one(Lorem));
    if (!short && random_number(0, 3) >= 2) words.push(pick_one(Lorem));

    return words.map(w => uc_first(w)).join(' ');
};

/**
 * Check if current string is only numeric
 */
export const is_numeric = (str: any) => {
    // var regex = new RegExp('^[0-9 ,.]{1,}$', 'g')

    return /^[\-|\+]?[0-9 ]{1,}([\.|\,][0-9 ]{1,})?$/g.test(str)

    // return regex.exec(str) !== null

    // return StringHelper.try_parse_float(str) !== null
}

/**
 * Check if uri segment correspond to a string pattern and return params
 * @param segment uri to check
 * @param pattern uri pattern
 * @returns 
 */
export const check_uri_segment = (segment: string, pattern: string): CheckURISegmentReturn => {

    const param: Record<string, any> = {}
    const adr = segment.split('?')
    segment = adr[0]
    let result = true
    const adr_1 = segment.split('/').filter((item) => item !== '')
    const adr_2 = pattern.split('/').filter((item) => item !== '')
    if (adr_1.length !== adr_2.length) {
        return { result: false, param }
    }

    for (var i = 0; i < adr_1.length; i++) {

        const reg_exp = /^\(\:([A-Za-z0-9]+)\)$/ 

        if (!((adr_1[i] === adr_2[i]) || reg_exp.test(adr_2[i]))) {
            result = false
        }

        if (reg_exp.test(adr_2[i])) {
            adr_2[i].replace(reg_exp, (match: string, placeholder: string) => {
                param[placeholder] = adr_1[i]
                return placeholder
            })
        }
    }

    return { result, param }
}

type CheckURISegmentReturn = { 
    /** Flag telling if there's correspondance */
    result: boolean, 
    /** Parametters match within the pattern */
    param: Record<string, string>
}
