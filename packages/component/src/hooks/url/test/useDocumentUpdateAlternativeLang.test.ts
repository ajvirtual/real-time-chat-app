import { renderHook } from "@testing-library/react-hooks"
import { useDocumentUpdateAlternativeLang } from "../useDocumentUpdateAlternativeLang"

describe('[useDocumentUpdateAlternativeLang]', () => {

    it('Change the alternate language from french', async () => {
        process.env.REACT_APP_LANG_SUPPORTED = 'en,fr'
        // @ts-ignore
        delete global.window.location
        global.window = Object.create(window);
        // @ts-ignore
        global.window.location = {
            href: 'https://isasolutions.mg/fr/outsoucing',
            hostname: 'isasolutions.mg',
            protocol: 'https:'
        };

        const { result,  } = renderHook(() => useDocumentUpdateAlternativeLang())
        result.current?.()

        const enAlternative = document.head.querySelector('link[rel=alternate][hreflang=en]')
        const frAlternative = document.head.querySelector('link[rel=alternate][hreflang=fr]')

        expect(enAlternative?.getAttribute('href')).toEqual('https://isasolutions.mg/en/outsoucing')
        expect(frAlternative?.getAttribute('href')).toEqual('https://isasolutions.mg/fr/outsoucing')
    })

    it('Change the alternate language from english', async () => {
        process.env.REACT_APP_LANG_SUPPORTED = 'en,fr'
        // @ts-ignore
        delete global.window.location
        global.window = Object.create(window);
        // @ts-ignore
        global.window.location = {
            href: 'https://isasolutions.mg/en/outsoucing',
            hostname: 'isasolutions.mg',
            protocol: 'https:'
        };

        const { result, } = renderHook(() => useDocumentUpdateAlternativeLang())
        result.current?.()

        const enAlternative = document.head.querySelector('link[rel=alternate][hreflang=en]')
        const frAlternative = document.head.querySelector('link[rel=alternate][hreflang=fr]')

        expect(enAlternative?.getAttribute('href')).toEqual('https://isasolutions.mg/en/outsoucing')
        expect(frAlternative?.getAttribute('href')).toEqual('https://isasolutions.mg/fr/outsoucing')
    })

    it('Change the alternate language for localhost', async () => {
        process.env.REACT_APP_LANG_SUPPORTED = 'en,fr'
        // @ts-ignore
        delete global.window.location
        global.window = Object.create(window);
        // @ts-ignore
        global.window.location = {
            href: 'http://localhost:3000/en/outsoucing',
            hostname: 'localhost',
            protocol: 'http:',
            port: '3000'
        };

        const { result, } = renderHook(() => useDocumentUpdateAlternativeLang())
        result.current?.()

        const enAlternative = document.head.querySelector('link[rel=alternate][hreflang=en]')
        const frAlternative = document.head.querySelector('link[rel=alternate][hreflang=fr]')

        expect(enAlternative?.getAttribute('href')).toEqual('http://localhost:3000/en/outsoucing')
        expect(frAlternative?.getAttribute('href')).toEqual('http://localhost:3000/fr/outsoucing')
    })

})
