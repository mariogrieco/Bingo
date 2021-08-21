import { Router } from 'express'

export const api = Router({
    caseSensitive: true,
    strict: true,
})

api.get('*', (req, res) => {
    res.write('api v1')
    res.end()
})
