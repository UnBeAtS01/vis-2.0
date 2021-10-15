import React from 'react';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <button onClick={() => this.props.Bfs()}>BFS</button>
                <div> start: <input type='number' value={this.props.startidx[0]} onChange={this.props.setstartX} />
                    <input type='number' value={this.props.startidx[1]} onChange={this.props.setstartY} /></div>
                <div>end: <input type='number' value={this.props.endidx[0]} onChange={this.props.setendX} />
                    <input type='number' value={this.props.endidx[1]} onChange={this.props.setendY} /></div>
            </div>
        )
    }
}
export default Header;