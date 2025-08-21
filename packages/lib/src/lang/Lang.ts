
/**
 * Class to handle fetching traduction within key
 * @deprected use "react-i18n" instead
 */
export class Lang {

    /**
     * Value containing array of traduction
     */
    private values?: ValuesType

    /**
     * Set the current lang list to use
     * @public
     * @param {Object} _value Lang list that will be used by the class
     * @returns {Lang} this
     */
    set_lang(_value: ValuesType): Lang {
        this.values = _value
        return this
    }
    
    /** 
     * Get translation using key
     */
    line(key?: string): string{
        if (!key) return ''
        return this.values?.[key] ? this.values?.[key] : key
    }

    /** 
     * Get translation using keys
     */
    lines(keys?: Array<string>): Array<string>{
        if (!keys) return []
        return keys.map((key) => this.line(key))  
    }
}

export type ValuesType = {
    [key: string]: string
}

export default Lang