import React from 'react'
import { reducer } from './reducer'
import initialState from "./initialState";

export const Store = React.createContext()

export function StoreProvider (props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = { state, dispatch }

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
