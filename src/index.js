module.exports = function solveSudoku(matrix) {
    let prevPos = [];
    let pos = {x: 0, y: 0, available: null};

    while (true) {
        if (matrix[pos.x][pos.y]) {
            pos = calcNextPosition(pos, matrix)
            if (!pos) {
                return matrix
            }
            continue
        }

        pos.available = pos.available === null ? getAvailable(pos, matrix) : pos.available;

        if (pos.available.length > 0) {
            matrix[pos.x][pos.y] = pos.available.pop();

            prevPos.push(pos);

            pos = calcNextPosition(pos, matrix)

            if (!pos) {
                return matrix
            }
        } else {
            pos = prevPos.pop();
            matrix[pos.x][pos.y] = 0
        }
    }
};

function calcNextPosition(pos, matrix) {
    if (pos.y === matrix.length - 1) {
        if (pos.x === matrix.length - 1) {
            return
        }
        return {x: pos.x + 1, y: 0, available: null}
    } else {
        return {x: pos.x, y: pos.y + 1, available: null}
    }
}

function getAvailable(pos, matrix) {
    let [r,c] = [Math.floor(pos.x/3)*3,Math.floor(pos.y/3)*3];
    let used = matrix.slice(r,r+3).reduce((s,v)=>v.slice(c,c+3).reduce((s,v)=>s.add(v),s),new Set())

    return [9, 8, 7, 6, 5, 4, 3, 2, 1]
        .filter(v => !matrix[pos.x].some(mv => mv === v))
        .filter(v => {
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[i][pos.y] === v) {
                    return false
                }
            }
            return true
        })
        .filter(v => !used.has(v))
}


