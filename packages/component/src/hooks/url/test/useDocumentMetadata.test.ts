import { screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { useDocumentMetadata } from "../useDocumentMetadata"

describe('[useDocumentMetadata]', () => {
    test.todo('create meta tag')
    // it('create meta tag', () => {
    //     const title = 'Hello'
    //     const description = 'Hello world!'
    //     const keywords = 'hello,world'
    //     const type = 'fr'
    //     const { result } = renderHook(() => useDocumentMetadata())
    //     result.current.setDocumentMetadata({
    //         title,
    //         description,
    //         keywords,
    //         type
    //     })
    //     const descriptionMeta = document.head.querySelector(`meta[description="${description}"]`)?.getAttribute('content')
    //     expect(document.title).toBe(title)
    //     screen.debug()
    //     expect(descriptionMeta).toBe(description)
    // })
})
