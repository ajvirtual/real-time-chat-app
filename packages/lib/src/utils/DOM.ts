
/**
 * Get DOM Element Attributes. If third param is set, it will update current attributes
 * @param object DOM Elment
 * @param key key
 * @param value value
 * @returns string | null
 */
export const attr = (object: HTMLElement, key: string, value?: string): string | null  => {
    if (!object)  return null;
    for (var i = 0; i < object.attributes.length; i++) {
        if (object.attributes[i].name === key) {
            if (value) {
                object.attributes[i].value = value
            }
            return object.attributes[i].value;
        }
    }
    return null;
}

/**
 * Add class from HTML Element
 * @param object HTMLElement
 * @param key key
 * @returns boolean
 */
export const addClass = (object: HTMLElement, key: string): boolean => {
    if (!object) return false

    if (!hasClass(object, key)) {
        object.className += ' ' + key;
    }
    return true
}

/**
 * Remove class from HTML Element
 * @param object HTMLELEMENT
 * @param key string
 * @returns boolean
 */
export const removeClass = (object: HTMLElement, key: string): boolean => {
    if (!object) return false

    const className_array = object.className.split(' ');
    let result = ''
    for (let i = 0; i < className_array.length; i++) {
        if (className_array[i] !== '' && className_array[i] !== key) {
            result += ' ' + className_array[i]
        }
    }

    object.className = result
    return true
}

/**
 * Toggle class from HTML Element
 * @param object HTMLElement
 * @param key string
 * @returns boolean
 */
export const toggleClass = (object: HTMLElement, key: string) : boolean => {
    if (object === undefined) return false

    if (!hasClass(object, key)) {
        addClass(object, key)
    }else{
        removeClass(object, key)
    }

    return true
}

/**
 * Check if HTML Element has class
 * @param object HTMLElement
 * @param key string
 * @returns boolean
 */
export const hasClass = (object: HTMLElement, key: string) => {
    if (object === undefined) return false
    const className = object.className
    // if (className.baseVal !== undefined) {
    //     className = className.baseVal
    // }

    if (typeof className !== 'string') return false
    const className_array = className.split(' ');
    return className_array.some((item) => item === key)
}

/**
 * Check if element has focus using query selector
 * @param query_selector Dom Query selector
 * @returns boolean
 */
export const hasFocus = (query_selector: string) => {
    var hasFocus = false
    var element_list = document.querySelectorAll(query_selector);

    element_list.forEach((element) => {
        if (document.activeElement === element) {
            hasFocus = true
        }
    })
    // check for focus
    return hasFocus;
}


export const get_width = (object: HTMLElement) => {
    if (object === undefined || object === null) {
        return 0
    }
    
    return object.offsetWidth
}

export const get_height = (object: HTMLElement) => {
    if (object === undefined || object === null) {
        return 0
    }
    
    return object.offsetHeight
}

export const get_scroll_height = (object: HTMLElement) => {
    if (object === undefined || object === null) {
        return 0
    }
    
    return object.scrollHeight
    
}

export const get_scroll_width = (object: HTMLElement) => {
    if (object === undefined || object === null) {
        return 0
    }
    
    return object.scrollWidth
}

export const rgb2hex = (_rgb: string): string => {
    const rgb = _rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

export const get_text_size = (str: string, fontSize: string = '12px', max_width: string = '10'): DimensionType => {

    //Todo : if 'text-container' doesn't exist create one
    const text: HTMLElement | null = document.getElementById("text-container")
    if (text) {
        text.innerHTML = str.replace(/(?:\r\n|\r|\n)/g, '<br/>|')
        text.style.fontSize = fontSize
        text.style.maxWidth = max_width
        text.style.lineHeight = '1.4'
        var height = (text.offsetHeight)
        var width = (text.offsetWidth)

        return { width, height }
    }
    
    return { width: 0, height: 0 }
}

export const get_image_size = (base64: string) : DimensionType => {
    var image: HTMLElement | null = document.getElementById("image-container")
    attr(image as HTMLElement, 'src', base64)
    return { width: image?.offsetWidth, height: image?.offsetHeight }
}

export const get_text_dimension = (str: string, { font_size = '14px', font_family, max_width }: TextDimensionStyleType): DimensionType => {
    const text: HTMLElement | null  = document.getElementById("text-container")
    if (text === null) {
        var text_container = document.createElement('div')
        text_container.style.position = 'absolute'
        text_container.style.left = '-2500px'
        text_container.style.opacity = '0'
        text_container.style.zIndex = '1'
        text_container.setAttribute('id', 'text-container')

        var body = document.querySelector('body')
        body?.appendChild(text_container)

        return get_text_dimension(str, { font_size, font_family, max_width })
    }


    text.innerHTML = str.replace(/(?:\r\n|\r|\n)/g, '<br/>|')
    text.style.fontFamily = font_family
    text.style.fontSize = font_size
    text.style.maxWidth = max_width
    text.style.lineHeight = '1.4'
    
    var height = text.offsetHeight
    var width = text.offsetWidth

    return { width, height }
}

export const css = (object: HTMLElement, key: string, value?: string): string | void => {
    if (!value) {
        return object.style[key as any]
    }
    object.style[key as any] = value
}

export type TextDimensionStyleType = { font_size: string, font_family: string, max_width: string }

export type DimensionType = { width?: number, height?: number }