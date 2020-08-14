import React from 'react';
import Detail from '../Detail/Detail';
import './Dashboard.css';
import Todos from '../Data';
import Calculator from '../Calculator/Calculator';

class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            detailView: false,
            detailObject: null
        };
    }

    render() {
        return (
            <div className="dashboard">
                {
                    !this.state.detailView ? <DashboardView todos={Todos.getTodos()} detailClick={this.onOpenDetail}/> : <Detail todo={this.state.detailObject} closeDetail={this.onCloseDetail} done={(todo) => {
                        todo.done = true;
                        Todos.updateTodo(todo.index, todo);
                        this.onCloseDetail();
                    }}/>
                }
                <Calculator />
            </div>
        );
    }

    onOpenDetail = (index) => {
        this.setState({
            detailView: true,
            detailObject: Todos.findTodo(index)
        });
    }

    onCloseDetail = () => {
        this.setState({
            detailView: false,
            detailObject: null
        });
    }
}

function DashboardView(props) {
    const [newTodo, setNewTodo] = React.useState(false);
    const [name, setName] = React.useState("");

    const todos = (
        <div className="row">
            {
                props.todos.map((todo) => {
                    return (
                        <div className="col-lg-4 col-md-8 offset-lg-4 offset-md-2" key={`todo` + todo.index}>
                            <button className="todo" onClick={() => props.detailClick(todo.index)} disabled={todo.done}>
                                {todo.name}
                            </button>
                        </div>
                    );
                })
            }
        </div>
    )

    return (
        <div className="App">
            <h1>DashboardView</h1>
            <div className="creation-todos">
                {
                    !newTodo ? (
                        <button onClick={() => {
                            setNewTodo(true);
                        }}>New Todo</button>
                    ) : (
                        <>
                            <input type="text" onChange={(ev) => setName(ev.currentTarget.value)}/>
                            <button onClick={() => {
                                Todos.addTodo(name);
                                setNewTodo(false);
                            }}>Add</button>
                        </>
                    )
                }
            </div>
            <div className="todos">
                {todos}
            </div>
        </div>
    );
  }

export default Dashboard;