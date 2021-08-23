const complexShapes = [
        [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1],
        ],
        [
            [1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ]
]

export function checkWinners (carton, numbers) {
    let winner = true

    // diagonal principal
    for (let cIndex = 0; cIndex < carton.length; cIndex++) {
        const row = carton[cIndex];
        for (let rI = 0; rI < row.length; rI++) {
            const element = row[rI];
            if (rI === cIndex && !(rI === 2 && cIndex === 2)) {
                if (numbers.indexOf(element) === -1) {
                    winner = false
                }
            }
        }
    }

    if (winner) return true

    winner = true
    // // diagonal invertida
    for (let cIndex = carton.length - 1; cIndex >= 0; cIndex--) {
        const row = carton[cIndex];
        for (let rI = 0; rI < row.length; rI++) {
            const element = row[rI];
            if (cIndex === ((row.length - rI) - 1) && !(rI === 2 && cIndex === 2)) {
                if (numbers.indexOf(element) === -1) {
                    winner = false
                }
            }
        }
    }

    if (winner) return true
    winner = true
    // linas rectac vertial[]

   for (let index = 0; index < 5; index++) {
        winner = true

        for (let cIndex = 0; cIndex < carton.length; cIndex++) {
            const row = carton[cIndex];
            for (let rI = 0; rI < row.length; rI++) {
                const element = row[rI];
                if (index === cIndex && !(rI === 2 && cIndex === 2)) {
                    if (numbers.indexOf(element) === -1) {
                        winner = false
                    }
                }
            }
        }

        if (winner) break
   }

    if (winner) return true
    winner = true
    // linas rectac horizontal[0,1,2,3,4]

   for (let index = 0; index < 5; index++) {
        winner = true

        for (let cIndex = 0; cIndex < carton.length; cIndex++) {
            const row = carton[cIndex];
            for (let rI = 0; rI < row.length; rI++) {
                const element = row[rI];
                if (index === rI && !(rI === 2 && cIndex === 2)) {
                    if (numbers.indexOf(element) === -1) {
                        winner = false
                    }
                }
            }
        }

        if (winner) break
   }


   if (winner) return true

   for (let shapeIndex = 0; shapeIndex < complexShapes.length; shapeIndex++) {
       const shape = complexShapes[shapeIndex];
       winner = true

       for (let cIndex = 0; cIndex < carton.length; cIndex++) {
            const row = carton[cIndex];
            for (let rI = 0; rI < row.length; rI++) {
                const element = row[rI];
                if (shape[cIndex][rI] === 1 && numbers.indexOf(element) === -1) {
                    winner = false
                }
            }
        }
        if (winner) break
   }

   if (winner) return true

    return winner
}
