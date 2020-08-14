import React from 'react';

class Detail extends React.Component {
    render() {
        return (
            <div>
                <button className="close" onClick={this.props.closeDetail}>X</button>
                <h1>{this.props.todo.name}</h1>
                <button onClick={() => {this.props.done(this.props.todo)}}>
                    Done
                </button>
            </div>
        );
    }
}

export default Detail;