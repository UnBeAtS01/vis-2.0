import React from 'react';
import './twod.scss';
import Header from './header';
import * as algo from '../algo/bfs.js';
import toast, { Toaster } from 'react-hot-toast';
class Twod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            startidx: [5, 5],
            endidx: [10, 10],
            isvisited: [],
            finalcolor: 0,
            danger: [],
            Fivewala: [],
            Twentywala: [],
            speed: 10,
            flag: 0,
            firstclick: 0,
            cost5: 0,
            cos20: 0,
            parents: [],
            finalpath: [],
        }
    }

    reset = () => {
        toast.success('You can draw walls using left click of a mouse.', {
            duration: 4000,
            position: 'top-center',
        });
        toast.success('You can also put weights for minpath algo and draw weight using left click of a mouse.', {
            duration: 4000,
            position: 'top-center',
        });

        const final = [];
        const finalsetgrid = [];
        const finalsetgrid2 = [];
        const finalsetgrid3 = [];
        const finalsetgrid4 = [];
        const parents = [];
        for (let i = 0; i < 20; i++) {
            const curr = [];
            const setgrid = [];
            const setgrid2 = [];
            const setgrid3 = [];
            const setgrid4 = [];
            const setparent = [];
            for (let j = 0; j < 40; j++) {

                const val = { x: i, y: j, isstart: 0, isend: 0 };
                if (i === this.state.startidx[0] && j === this.state.startidx[1]) {
                    val.isstart = 1;
                }
                if (i === this.state.endidx[0] && j === this.state.endidx[1]) {
                    val.isend = 1;
                }
                curr.push(val);
                setgrid.push(0);
                setgrid2.push(0);
                setgrid3.push(0);
                setgrid4.push(0);
                setparent.push([- 1, -1]);
            }

            final.push(curr);
            finalsetgrid.push(setgrid);
            finalsetgrid2.push(setgrid2);
            finalsetgrid3.push(setgrid3);
            finalsetgrid4.push(setgrid4);
            parents.push(setparent);

        }
        this.setState({ grid: final, finalcolor: 0, cost20: 0, cost5: 0 });
        this.setState({ isvisited: finalsetgrid, danger: finalsetgrid, flag: 0, Fivewala: finalsetgrid2, Twentywala: finalsetgrid3, parents: parents, finalpath: finalsetgrid4 });
        console.log(this.state.isvisited);
        console.log(finalsetgrid);

    }
    componentDidMount() {
        this.reset();


    }
    calls = async (curr, i, pass) => {
        setTimeout(() => {
            pass[curr[i][0]][curr[i][1]] = 1;
            this.setState({ isvisited: pass });
        }, (i + 1) * this.state.speed);
    }
    bfs = async () => {
        let empty = [];
        for (let i = 0; i < 20; i++) {
            const temp = [];
            for (let j = 0; j < 50; j++) {
                temp.push(0);
            }
            empty.push(temp);
        }

        const pass = this.state.isvisited;
        const val1 = this.state.startidx;
        const val2 = this.state.endidx;
        const danger = this.state.danger;
        const curr = algo.Breadthsearch(pass, val1, val2, danger);
        for (let i = 0; i < curr.length; i++) {
            await this.calls(curr, i, empty);
        }
        setTimeout(() => {
            this.setState({ finalcolor: 1 });
            let n = curr.length;
            console.log(curr[n - 1][0], curr[n - 1][1]);
            if (curr[n - 1][0] === this.state.endidx[0] && curr[n - 1][1] === this.state.endidx[1]) {

                toast.success("Found :)", {
                    duration: 4000,
                    position: 'top-center',
                });
            }
            else {
                toast.error("NOT POSSIBLE TO REACH :')", {
                    duration: 4000,
                    position: 'top-center',
                });
            }

        }, this.state.speed * (curr.length + 1));

    }
    dfs = async () => {
        let empty = [];
        for (let i = 0; i < 20; i++) {
            const temp = [];
            for (let j = 0; j < 50; j++) {
                temp.push(0);
            }
            empty.push(temp);
        }

        const pass = this.state.isvisited;
        const val1 = this.state.startidx;
        const val2 = this.state.endidx;
        const danger = this.state.danger;
        const curr = algo.Depthsearch(pass, val1, val2, danger);
        for (let i = 0; i < curr.length; i++) {
            await this.calls(curr, i, empty);
        }
        setTimeout(() => {
            this.setState({ finalcolor: 1 });
            let n = curr.length;
            console.log(curr[n - 1][0], curr[n - 1][1]);
            if (curr[n - 1][0] === this.state.endidx[0] && curr[n - 1][1] === this.state.endidx[1]) {

                toast.success("Found :)", {
                    duration: 4000,
                    position: 'top-center',
                });
            }
            else {
                toast.error("NOT POSSIBLE TO REACH :')", {
                    duration: 4000,
                    position: 'top-center',
                });
            }

        }, this.state.speed * (curr.length + 1));

    }
    Dijikstra = async () => {
        let empty = [];
        for (let i = 0; i < 20; i++) {
            const temp = [];
            for (let j = 0; j < 50; j++) {
                temp.push(0);
            }
            empty.push(temp);
        }
        const minDist = [];
        for (let i = 0; i < 20; i++) {
            const tempk = [];
            for (let j = 0; j < 50; j++) {
                tempk.push(2666666);
            }
            minDist.push(tempk);
        }
        const pass = this.state.isvisited;
        const val1 = this.state.startidx;
        const val2 = this.state.endidx;
        const danger = this.state.danger;
        const fivewala = this.state.Fivewala;
        const twentywala = this.state.Twentywala;
        const parents = this.state.parents;
        const curr = algo.shortestPath(pass, val1, val2, danger, fivewala, twentywala, minDist, parents);
        console.log(minDist);
        for (let i = 0; i < curr.length; i++) {
            await this.calls(curr, i, empty);
        }
        let currx = this.state.endidx[0];
        let curry = this.state.endidx[1];
        const finalpath = this.state.finalpath;
        while (parents[currx][curry] !== [-1, -1] && !(currx === this.state.startidx[0] && curry === this.state.startidx[1])) {
            finalpath[currx][curry] = 1;
            const tempx = parents[currx][curry][0];
            const tempy = parents[currx][curry][1];
            currx = tempx;
            curry = tempy;
        }

        setTimeout(() => {
            this.setState({ finalcolor: 1, finalpath: finalpath });
            let n = curr.length;
            console.log(curr[n - 1][0], curr[n - 1][1]);
            if (curr[n - 1][0] === this.state.endidx[0] && curr[n - 1][1] === this.state.endidx[1]) {

                toast.success("Founded with minpath length:" + minDist[curr[n - 1][0]][curr[n - 1][1]], {
                    duration: 4000,
                    position: 'top-center',
                });

            }
            else {
                toast.error("NOT POSSIBLE TO REACH :')", {
                    duration: 4000,
                    position: 'top-center',
                });
            }

        }, this.state.speed * (curr.length + 2));
    }
    setstartX = async (e) => {
        const val = parseInt(e.target.value);
        console.log(val);
        const prev = this.state.startidx;
        await this.setState({ startidx: [parseInt(val), prev[1]] });
        //await this.reset();
        console.log(this.state.startidx, this.state.endidx);


    }
    setstartY = async (e) => {
        const val = parseInt(e.target.value);
        const prev = this.state.startidx;
        await this.setState({ startidx: [prev[0], val] });
        //await this.reset();
        console.log(this.state.startidx, this.state.endidx);
    }
    setendY = async (e) => {
        const val = parseInt(e.target.value);
        const prev = this.state.endidx;
        await this.setState({ endidx: [prev[0], val] });
        //await this.reset();
        console.log(this.state.startidx, this.state.endidx);
    }
    setendX = async (e) => {
        const val = parseInt(e.target.value);
        const prev = this.state.endidx;
        await this.setState({ endidx: [val, prev[1]] });
       // await this.reset();
        console.log(this.state.startidx, this.state.endidx);
    }

    blockmovedown = (x, y, str) => {

        const dangercurr = this.state.danger;
        const Fivewala = this.state.Fivewala;
        const Twentywala = this.state.Twentywala;

        if (str === "Zwala") {
            this.setState({ firstclick: 1 });
            console.log("0wala fuction");
            if (dangercurr[x][y] === 0) {
                dangercurr[x][y] = -1;
                this.setState({ danger: dangercurr, flag: 1 });
            }
            else {
                dangercurr[x][y] = 0;
                this.setState({ danger: dangercurr, flag: 0 });
            }
        }
        else if (str === "Fwala" && dangercurr[x][y] === 0) {
            console.log("5wala fuction");
            if (Fivewala[x][y] === 0) {
                Fivewala[x][y] = -1;
                this.setState({ Fivewala: Fivewala });
            }
            else {
                Fivewala[x][y] = 0;
                this.setState({ Fivewala: Fivewala });
            }
            console.log(dangercurr, Fivewala);
        }
        else if (str === "Twala" && dangercurr[x][y] === 0) {
            if (Twentywala[x][y] === 0) {
                Twentywala[x][y] = -1;
                this.setState({ Twentywala: Twentywala });
            }
            else {
                Twentywala[x][y] = 0;
                this.setState({ Twentywala: Twentywala });
            }
        }
    }
    blockmove = (x, y, str) => {
        if (this.state.firstclick === 0 || str !== "Zwala") return;
        if (str === "Zwala") {
            //console.log("0wala fuction");
            const dangercurr = this.state.danger;
            if (this.state.flag === 1) {
                dangercurr[x][y] = -1;
            }
            else {
                dangercurr[x][y] = 0;
            }
            this.setState({ danger: dangercurr });
        }
    }
    blockmoveup = (x, y, str) => {
        this.setState({ flag: 0, firstclick: 0, cost20: 0, cost5: 0 });
    }
    setSpeed = (e) => {
        const val = e.target.value;
        this.setState({ speed: val });
    }
    Fiveselected = () => {

        this.setState({ cost20: 0, cost5: !this.state.cost5 });

    }
    Twentyselected = () => {

        this.setState({ cost5: 0, cost20: !this.state.cost20 });

    }

    render() {
        const grid = this.state.grid;
        return (
            <div >
                <Header fiveon={this.state.cost5} twentyon={this.state.cost20} Dijikstra={this.Dijikstra} selected5={this.Fiveselected} selected20={this.Twentyselected} reset={this.reset} Dfs={this.dfs} speed={this.state.speed} setSpeed={this.setSpeed} Bfs={this.bfs} setstartX={this.setstartX} setstartY={this.setstartY} setendX={this.setendX} setendY={this.setendY} startidx={this.state.startidx} endidx={this.state.endidx} />

                <div>{
                    grid.map((ele, idx) => {

                        return <div key={idx} className='row'>
                            {
                                ele.map((party, idxx) => {
                                    // console.log(party.isstart);
                                    if (party.isstart)
                                        return <div className='box start' key={idxx} ></div>
                                    else if (party.isend)
                                        return <div className='box end' key={idxx}></div>
                                    else {
                                        if (this.state.isvisited[party.x][party.y] === 1) {
                                            if (this.state.finalcolor === 0)
                                                return <div className='box visited' key={idxx} ></div>
                                            else {
                                                if (this.state.finalpath[party.x][party.y] === 1)
                                                    return <div className='box visited3' key={idxx}></div>
                                                return <div className='box visited2' key={idxx}></div>
                                            }
                                        }
                                        else {
                                            const dangercurr = this.state.danger;
                                            const Fivewala = this.state.Fivewala;
                                            const Twentywala = this.state.Twentywala;
                                            //console.log(this.state.cost5);
                                            if (this.state.cost5 === true && dangercurr[party.x][party.y] === 0 && this.state.Twentywala[party.x][party.y] !== -1) {
                                                console.log("5 ka andar-->", Fivewala[party.x][party.y]);
                                                return <div className={`box ${Fivewala[party.x][party.y] === -1 ? 'blockedFive' : ''
                                                    } `} onClick={() => { this.blockmovedown(party.x, party.y, "Fwala") }} key={idxx}></div>
                                            }
                                            else if (this.state.cost20 === true && dangercurr[party.x][party.y] === 0 && this.state.Fivewala[party.x][party.y] !== -1) {
                                                // console.log("20 ka andar")
                                                return <div className={`box ${Twentywala[party.x][party.y] === -1 ? 'blockedTwenty' : ''} `} onClick={() => { this.blockmovedown(party.x, party.y, "Twala") }} key={idxx}></div>
                                            }
                                            else if (this.state.Fivewala[party.x][party.y] === -1) {
                                                return <div className={`box blockedFive`} key={idxx}></div>
                                            }
                                            else if (this.state.Twentywala[party.x][party.y] === -1) {
                                                return <div className={`box blockedTwenty`} key={idxx}></div>
                                            }
                                            else {
                                                // console.log("0 ka andar-->", dangercurr[party.x][party.y]);
                                                return <div className={`box ${dangercurr[party.x][party.y] === -1 ? 'blocked' : ''} `} onMouseDownCapture={() => { this.blockmovedown(party.x, party.y, "Zwala") }} onMouseMove={() => { this.blockmove(party.x, party.y, "Zwala") }} onMouseUpCapture={() => { this.blockmoveup(party.x, party.y, "Zwala") }} key={idxx}></div>

                                            }
                                        }

                                    }
                                })
                            }

                        </div>

                    })}</div>
                <Toaster />
            </div>




        )
    }
}
export default Twod;
