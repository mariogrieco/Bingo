import {
    cards_options,
    card_selected,
    players_count,
} from './actions'

export function reducer (state, action) {
    switch (action.type) {
        case players_count:
            return { ...state, count: action.payload }
        case card_selected:
            return { ...state, card_selected: action.payload }
        case cards_options:
            return { ...state, cards_options: action.payload }
        default:
            throw new Error(`Action of type "${action.type}" is not defined`)
    }
}
