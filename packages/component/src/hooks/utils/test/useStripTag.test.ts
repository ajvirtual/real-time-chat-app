import { renderHook, act } from '@testing-library/react-hooks'
import { useStripTag } from '../useStripTag'

describe('[useStripTag] Clear html tags inside string', () => {
    it('clear html', () => {
        const text = 'IsaWeb.LaserLabs.Personalisation.description'
        const textHtml = `<p>${text}<br></p>`
        const { result } = renderHook(() => useStripTag())
        act(() => {
            const data = result.current(textHtml)
            expect(data).toEqual(text)
        })
    })
})
