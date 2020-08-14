class Todos {
    todos = [
        {
            index: 1,
            name: "ABC1",
            done: true
        },
        {
            index: 3,
            name: "ABC3"
        }
    ];

    getTodos() {
        return this.todos;
    }

    findTodo(index) {
        return this.todos.find((item) => {
            if(item.index === index)
                return true;
            return false;
        });
    }

    addTodo(name) {
        let index = this.todos[this.todos.length - 1].index;
        this.todos.forEach((item) => {
            if(item.index > index) {
                index = item.index;
            }
        });

        index++;

        this.todos.push({
            index: index,
            name: name
        });
    }

    updateTodo(index, todo) {
        this.todos.forEach((item) => {
            if(item.index === index) {
                item = todo;
            }
        });
    }

    deleteTodo(index) {
        this.todos.filter((item) => {
            if(item.index === index) {
                return false;
            }
            return true;
        })
    }
}


export default (() => {
    if(typeof window.Todos == "undefined") {
        window.Todos = new Todos();
    }

    return window.Todos;
})();