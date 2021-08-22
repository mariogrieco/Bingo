import { cards_options } from './actions'

export function reducer (state, action) {
    switch (action.type) {
        case cards_options:
            return { ...state, cards_options: action.payload }
        default:
            throw new Error(`Action of type "${action.type}" is not defined`)
    }
}
