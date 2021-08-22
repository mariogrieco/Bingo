export function crearCarton () {
    return [
        new Array(5).fill(1).map(() => Math.round((Math.random() * 101))),
        new Array(5).fill(1).map(() => Math.round((Math.random() * 101))),
        new Array(5).fill(1).map(() => Math.round((Math.random() * 101))),
        new Array(5).fill(1).map(() => Math.round((Math.random() * 101))),
        new Array(5).fill(1).map(() => Math.round((Math.random() * 101))),
    ]
}
