import React from 'react';
import './twod.scss';
import Header from './header';
import * as algo from '../algo/bfs.js';
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
            speed: 100,
            flag: 0,
            firstclick: 0
        }
    }

    reset = () => {
        const final = [];
        const finalsetgrid = [];
        for (let i = 0; i < 20; i++) {
            const curr = [];
            const setgrid = [];
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
            }

            final.push(curr);
            finalsetgrid.push(setgrid);

        }
        this.setState({ grid: final, finalcolor: 0 });
        this.setState({ isvisited: finalsetgrid, danger: finalsetgrid, flag: 0 });
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
            this.setState({ finalcolor: 1 })
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
            this.setState({ finalcolor: 1 })
        }, this.state.speed * (curr.length + 1));
    }
    setstartX = async (e) => {
        const val = parseInt(e.target.value);
        console.log(val);
        const prev = this.state.startidx;
        await this.setState({ startidx: [parseInt(val), prev[1]] });
        await this.reset();
        console.log(this.state.startidx, this.state.endidx);


    }
    setstartY = async (e) => {
        const val = parseInt(e.target.value);
        const prev = this.state.startidx;
        await this.setState({ startidx: [prev[0], val] });
        await this.reset();
        console.log(this.state.startidx, this.state.endidx);
    }
    setendY = async (e) => {
        const val = parseInt(e.target.value);
        const prev = this.state.endidx;
        await this.setState({ endidx: [prev[0], val] });
        await this.reset();
        console.log(this.state.startidx, this.state.endidx);
    }
    setendX = async (e) => {
        const val = parseInt(e.target.value);
        const prev = this.state.endidx;
        await this.setState({ endidx: [val, prev[1]] });
        await this.reset();
        console.log(this.state.startidx, this.state.endidx);
    }
    /*blockclick = (x, y) => {
        const temp = [x, y];
        const dangercurr = this.state.danger;
        if (dangercurr[x][y] === 0) {
            dangercurr[x][y] = -1;

        }
        else
            dangercurr[x][y] = 0;
        this.setState({ danger: dangercurr });

    }*/
    blockmovedown = (x, y) => {
        const temp = [x, y];
        const dangercurr = this.state.danger;
        this.setState({ firstclick: 1 });
        if (dangercurr[x][y] === 0) {
            dangercurr[x][y] = -1;
            this.setState({ danger: dangercurr, flag: 1 });
        }
        else {
            dangercurr[x][y] = 0;
            this.setState({ danger: dangercurr, flag: 0 });
        }
    }
    blockmove = (x, y) => {
        if (this.state.firstclick === 0) return;
        const dangercurr = this.state.danger;
        if (this.state.flag === 1) {
            dangercurr[x][y] = -1;
        }
        else {
            dangercurr[x][y] = 0;
        }
        this.setState({ danger: dangercurr });
    }
    blockmoveup = (x, y) => {


        this.setState({ flag: 0, firstclick: 0 });



    }
    setSpeed = (e) => {
        const val = e.target.value;
        this.setState({ speed: val });
    }
    render() {
        const grid = this.state.grid;
        return (
            <div >
                <Header reset={this.reset} Dfs={this.dfs} speed={this.state.speed} setSpeed={this.setSpeed} Bfs={this.bfs} setstartX={this.setstartX} setstartY={this.setstartY} setendX={this.setendX} setendY={this.setendY} startidx={this.state.startidx} endidx={this.state.endidx} />

                <div>{
                    grid.map((ele, idx) => {
                        //console.log(ele)
                        // console.log(this.state.isvisited[0][2]);
                        //console.log(this.state.isvisited);
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
                                                return <div className='box visited2' key={idxx}></div>
                                            }
                                        }
                                        else
                                            return <div className={`box ${this.state.danger[party.x][party.y] === -1 ? 'blocked' : ''}`} onMouseDownCapture={() => { this.blockmovedown(party.x, party.y) }} onMouseMove={() => { this.blockmove(party.x, party.y) }} onMouseUpCapture={() => { this.blockmoveup(party.x, party.y) }} key={idxx}></div>
                                    }
                                })
                            }

                        </div>

                    })}</div>
            </div>




        )
    }
}
export default Twod;