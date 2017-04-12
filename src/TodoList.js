import React from 'react'
import uuid from 'uuid/v4'

export class TodoList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { todos: [] }
	}
	render() {
		const renderedTodos = this.state.todos.map(todo => <li key={todo.id}>{todo.text}</li>)

		return (<div>
			<NewTodo createTodo={ t => this.setState({ todos: [...this.state.todos, {
				id: uuid(),
				text: t
				}]}) }/>
			<ul>
				{ renderedTodos }
			</ul>
			
		</div>)
	}
}

class NewTodo extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			newTodoValue : ""
		}
	
	}

	render() {

		return (<div>
			<input type="text" value={this.state.newTodoValue} onChange={(event) => { 
				this.setState({ newTodoValue: event.target.value })
			}}/>
			<input type="button" value="Add" onClick={() => {
				this.props.createTodo(this.state.newTodoValue)
				this.setState({newTodoValue: ""})
			}}/>
			</div>)
	}

}
