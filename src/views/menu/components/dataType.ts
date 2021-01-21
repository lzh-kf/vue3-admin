interface Data {
    visible: boolean,
    color: string,
}

interface Ele extends Element {
    innerText: string
}

type DomElement = Ele | null

export { Data, DomElement }