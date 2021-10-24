import React from 'react';
import './header.scss';
class Header extends React.Component {

    render() {
        return (
            <div className="Nav-bar">
                <div className='rearrange'>   <div> start(x,y): <input type='number' value={this.props.startidx[0]} onChange={this.props.setstartX} />
                    <input className='spacebar' type='number' value={this.props.startidx[1]} onChange={this.props.setstartY} /></div>
                    <div>end(x,y): <input className='spacebar' type='number' value={this.props.endidx[0]} onChange={this.props.setendX} />
                        <input className='spacebar' type='number' value={this.props.endidx[1]} onChange={this.props.setendY} /></div>
                    <div>speed(ms): <input className='spacebar' type='number' value={this.props.speed} onChange={this.props.setSpeed} /></div>  </div>

                <div className='sorting'>  <button className='buttons' onClick={this.props.reset}>Re-set</button>
                    <button className='buttons' onClick={() => this.props.Bfs()}>BFS</button>
                    <button className='buttons' onClick={() => this.props.Dfs()}>Dfs</button>
                    <div className='dijikstra'>
                        <button className='buttons' onClick={() => this.props.Dijikstra()}>Dijikstra</button>
                        <div className='cost-blocks'>
                            <button className={`weightb ${this.props.fiveon ? 'lightup' : ''}`} onClick={() => this.props.selected5()}>5</button>
                            <button className={`weightb ${this.props.twentyon ? 'lightup' : ''}`} onClick={() => this.props.selected20()}>20</button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
export default Header;