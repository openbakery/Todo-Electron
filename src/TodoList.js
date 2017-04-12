import React from 'react'

import {Todo} from './Todo'


export class TodoList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { todos: [] }
	}
	render() {
		const renderedTodos = this.state.todos
				.sort((t1, t2) => {
					let t1Weight = t1.done + t1.createdDate.getTime().toString()
					let t2Weight = t2.done + t2.createdDate.getTime().toString()
					
					return t1Weight.localeCompare(t2Weight)
				})
				.map(todo => <TodoItem key={todo.id} todo={todo} 
			toggleDone={this._toggleDone.bind(this)}/>)

		return (<div>
			<NewTodo createTodo={ text => this.setState({ todos: [...this.state.todos, new Todo(text) ] }) }/>
			<ul>
				{ renderedTodos }
			</ul>
			
		</div>)
	}
	_toggleDone(done, id) {
		this.setState({
			todos: this.state.todos.map(t => t.id==id?t.toggleDone(done):t)
		})
	}
}


class TodoItem extends React.Component {

	render() {
		return (
			<li>
				<input type="checkbox" checked={this.props.todo.done} 
					onChange={this._onChange.bind(this)}/>
				<span>{this.props.todo.text}</span>
			</li>)
	}

	_onChange(event) {
		this.props.toggleDone(event.target.value, this.props.todo.id)
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
