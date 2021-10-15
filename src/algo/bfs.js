const row = [-1, 0, 1, 0];
const col = [0, 1, 0, -1];

export const Breadthsearch = (pass, start, end, danger) => {
    console.log(pass);
    const name = pass;
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
        name[now[0]][now[1]] = 1;
        for (let i = 0; i < 4; i++) {

            let X = now[0] + row[i];
            let Y = now[1] + col[i];
            if (X === end[0] && Y === end[1]) {
                console.log('exit');
                return final2darray;
            }
            if (X >= 0 && X < 20 && Y >= 0 && Y < 50 && name[X][Y] === 0 && danger[X][Y] != -1) {

                const temp3 = [X, Y];
                currs.push(temp3);
                final2darray.push(temp3);
                name[X][Y] = 1;

            }
        }
    }
    //console.log('idhar');
    return final2darray;
}