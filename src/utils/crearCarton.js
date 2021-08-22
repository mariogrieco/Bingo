const MIN_VALUE = 1;
const MAX_VALUE = 75;

function getRandom () {
    return MIN_VALUE + (Math.round((Math.random() * MAX_VALUE + MIN_VALUE) % MAX_VALUE - MIN_VALUE))
}

export function crearCarton () {
    const carton = [
        new Array(5).fill(1).map(() => getRandom()),
        new Array(5).fill(1).map(() => getRandom()),
        new Array(5).fill(1).map(() => getRandom()),
        new Array(5).fill(1).map(() => getRandom()),
        new Array(5).fill(1).map(() => getRandom()),
    ]

    carton[2][2] = 'X'  // center

    return carton
}
