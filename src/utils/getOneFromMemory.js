export function getOneFromMemory (cartones = {}, numeros = []) {
    const numbers = Object.keys(cartones).map(key => cartones[key]).reduce((a, current) => {
        const numbers = current.card.reduce((inner_a, current) => {
            return  [...inner_a, ...current]
        }, [])

        return [...a, ...numbers]
    }, []).filter(num => numeros.indexOf(num) === -1)

    return numbers[Math.round(Math.random() * numbers.length) % numbers.length]
}
