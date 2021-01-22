import { setLocal } from '@/utils/cache'
import { defaultThemeColor } from './const'

interface Ele extends Element {
    innerText: string;
}

type DomElement = Ele | null

export default function (): void {
    const { themeColor = defaultThemeColor } = setLocal
    const style: DomElement = document.querySelector('head style')
    if (style) {
        style.innerText = `:root {--theme-color: ${themeColor};}`
    }
}