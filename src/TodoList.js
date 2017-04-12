import React from 'react'
import ReactDOM from 'react-dom'

import {ExpeditedTodo, Todo} from './Todo'


export class TodoList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { todos: [] }
	}
	render() {
		const renderedTodos = this.state.todos
				.sort((t1, t2) => {
					return t1.weight().localeCompare(t2.weight())
				})
				.map(todo => <ExpeditedTodoItem key={todo.id} todo={todo} 
			toggleDone={this._toggleDone.bind(this)}/>)

		return (<div>
			<NewPrioritizedTodo addTodo={ todo => this.setState({ todos: [...this.state.todos, todo ] }) }/>
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
		this.props.toggleDone(event.target.checked, this.props.todo.id)
	}
}

class ExpeditedTodoItem extends TodoItem {
	componentDidMount() {
		const currentNode=ReactDOM.findDOMNode(this)
		if(this.props.todo.expedited) {
			currentNode.style.color='red'
		}
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
			{this.renderInputFields()}
			<input type="button" value="Add" onClick={() => {
				this.props.addTodo(this.createTodo())
				this.setState({newTodoValue: ""})
			}}/>
			</div>)
	}

	createTodo() {
		return new Todo(this.state.newTodoValue)
	}

	renderInputFields() {
		return (<input type="text" value={this.state.newTodoValue} onChange={(event) => { 
				this.setState({ newTodoValue: event.target.value })
		}}/>)
	}
}

class NewPrioritizedTodo extends NewTodo {
	constructor(props) {
		super(props)
		this.state = Object.assign({}, this.state, { expedite: false })
	}

	renderInputFields() {
		return (<span>
			{super.renderInputFields()}
			<input type="checkbox" checked={this.state.expedite} 
					onChange={(event) => 
						this.setState({ expedite: event.target.checked })}/>
			"Expedite"
			</span>)
	}

	createTodo() {
		return new ExpeditedTodo(this.state.newTodoValue, this.state.expedite)
	}
}
