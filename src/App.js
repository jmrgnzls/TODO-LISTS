import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      newToDo: {
        text: ""
      },
      toEdit: {
        isEditMode: false,
        id: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.toEdit = this.toEdit.bind(this);
    this.closeEditTodo = this.closeEditTodo.bind(this);
    this.addEditedTodo = this.addEditedTodo.bind(this);
    this.markToDo = this.markToDo.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const id = this.state.lists.length + 1;
    console.log(id);

    this.setState({
      newToDo: {
        text: e.target.value
      }
    });
  }

  addTodo(e) {
    e.preventDefault();

    this.setState(prevState => {
      return {
        lists: prevState.lists.concat({
          id: prevState.lists.length + 1,
          text: prevState.newToDo.text, //prevstate for latest state
          isCompleted: false
        }),
        newToDo: {
          text: ""
        }
      };
    });
    console.log(this.state);
  }

  removeToDo(id) {
    this.setState({
      lists: this.state.lists.filter(list => list.id !== id)
    });
  }

  closeEditTodo() {
    this.setState({
      toEdit: {
        isEditMode: false,
        id: ""
      }
    });
  }

  toEdit(todo) {
    this.setState({
      toEdit: todo
    });
  }

  addEditedTodo(e) {
    e.preventDefault();

    this.setState(prevState => ({
      lists: prevState.lists.map(list => {
        if (list.id === prevState.toEdit.id) {
          list.text = prevState.toEdit.text;
        }
        return list;
      }),
      toEdit: {}
    }));
  }
  markToDo(id) {
    this.setState({
      lists: this.state.lists.map(todo => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    });
  }

  render() {
    function todEditFields(save, close, textConfig) {
      return (
        <span>
          <input
            type="text"
            value={textConfig.value}
            onChange={textConfig.onChange}
          />
          <button onClick={save} disabled={textConfig.value === ""}>
            Save
          </button>
          <button onClick={close}>Close</button>
        </span>
      );
    }
    return (
      <div>
        <h1>Todo</h1>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Make Coffee"
          value={this.state.newToDo.text}
        />
        <button
          onClick={this.addTodo}
          disabled={this.state.newToDo.text === ""}
        >
          Add new ToDo
        </button>

        <ul>
          {this.state.lists.map((todo, index) => (
            <li key={index}>
              <input type="checkbox" onChange={() => this.markToDo(todo.id)} />
              {this.state.toEdit.id === todo.id ? (
                todEditFields(this.addEditedTodo, this.closeEditTodo, {
                  value: this.state.toEdit.text,
                  onChange: e => {
                    let val = e.target.value;

                    this.setState(prevState => ({
                      toEdit: {
                        ...prevState.toEdit,
                        text: val
                      }
                    }));
                  }
                })
              ) : (
                <span>
                  <span
                    style={{
                      marginRight: 20,
                      textDecoration: todo.isCompleted ? "line-through" : "none"
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => this.toEdit(todo)}
                    disabled={todo.isCompleted}
                  >
                    Edit
                  </button>
                  <button onClick={() => this.removeToDo(todo.id)}>
                    Delete
                  </button>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
