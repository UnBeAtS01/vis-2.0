const row = [-1, 0, 1, 0];
const col = [0, 1, 0, -1];

export const Breadthsearch = (pass, start, end, danger) => {
    console.log(pass);
    const visits = pass;
    const currs = [];
    const temp = [start[0], start[1]];
    const final2darray = [];
    currs.push(temp);
    final2darray.push(temp);
    while (currs.length > 0) {
        //console.log(currs[0]);
        const now = currs[0];
        //console.log(now);
        currs.shift();
        visits[now[0]][now[1]] = 1;
        for (let i = 0; i < 4; i++) {

            let X = now[0] + row[i];
            let Y = now[1] + col[i];
            if (X === end[0] && Y === end[1]) {
                console.log('exit');
                const temp3 = [X, Y];
                currs.push(temp3);
                console.log(temp3);
                final2darray.push(temp3);
                return final2darray;
            }
            if (X >= 0 && X < 20 && Y >= 0 && Y < 50 && visits[X][Y] === 0 && danger[X][Y] !== -1) {

                const temp3 = [X, Y];
                currs.push(temp3);
                final2darray.push(temp3);
                visits[X][Y] = 1;

            }
        }
    }
    //console.log('idhar');
    return final2darray;
}
let flag = 0;
const solve = (visits, curr, end, danger, final2darray) => {
    if (flag === 1) return;
    for (let i = 0; i < 4; i++) {
        if (flag === 1) return;
        let X = curr[0] + row[i];
        let Y = curr[1] + col[i];
        if (X === end[0] && Y === end[1]) {
            console.log('exit');
            const temp3 = [X, Y];
            final2darray.push(temp3);
            flag = 1;
            return;
        }
        if (X >= 0 && Y >= 0 && X < 20 && Y < 50 && visits[X][Y] === 0 && danger[X][Y] !== -1) {
            const temp3 = [X, Y];
            final2darray.push(temp3);
            visits[X][Y] = 1;
            solve(visits, temp3, end, danger, final2darray);
        }

    }
}
export const Depthsearch = (pass, start, end, danger) => {
    const visits = pass;
    flag = 0;
    const final2darray = [];
    for (let i = 0; i < 4; i++) {
        if (flag === 1) return final2darray;
        let X = start[0] + row[i];
        let Y = start[1] + col[i];
        if (X === end[0] && Y === end[1]) {
            console.log('exit');
            const temp3 = [X, Y];
            final2darray.push(temp3);
            return final2darray;
        }
        if (X >= 0 && Y >= 0 && X < 20 && Y < 50 && visits[X][Y] === 0 && danger[X][Y] !== -1) {
            const temp3 = [X, Y];
            final2darray.push(temp3);
            visits[X][Y] = 1;
            solve(visits, temp3, end, danger, final2darray);
        }

    }
    return final2darray;
}
function compare(a, b) {

    return a[0] - b[0];
}
export const shortestPath = (pass, start, end, danger, fivewala, twentywala, minDist, parents) => {
    minDist[start[0]][start[1]] = 0;
    const visits = pass;
    const currs = [];
    const temp = [0, start[0], start[1]];
    const final2darray = [];
    currs.push(temp);


    while (currs.length > 0) {
        //console.log(currs[0]);
        currs.sort(compare);
        const now = currs[0];
        // console.log(now);
        currs.shift();
        if (visits[now[1]][now[2]]) continue;
        const templen = [now[1], now[2]];
        final2darray.push(templen);
        visits[now[1]][now[2]] = 1;
        if (now[1] === end[0] && now[2] === end[1]) {
            let weight = 1;
            minDist[now[1]][now[2]] = Math.min(minDist[now[1]][now[2]], now[0] + weight);
            return final2darray;
        }
        for (let i = 0; i < 4; i++) {

            let X = now[1] + row[i];
            let Y = now[2] + col[i];

            if (X >= 0 && X < 20 && Y >= 0 && Y < 50 && visits[X][Y] === 0 && danger[X][Y] !== -1) {
                let weight = 1;
                if (fivewala[X][Y] === -1) {
                    weight = 5;
                }
                if (twentywala[X][Y] === -1) {
                    weight = 20;
                }


                if (minDist[X][Y] > now[0] + weight) {
                    minDist[X][Y] = now[0] + weight;
                    parents[X][Y] = [now[1], now[2]];
                    const temp3 = [minDist[X][Y], X, Y];
                    currs.push(temp3);
                }


            }
        }
    }
    //console.log('idhar');
    return final2darray;
}