import uuid from 'uuid/v4'

export class Todo {
	constructor(text) {
		this.text = text
		this.id =  uuid()
		this.createdDate = new Date()
		this.done = false
	}

	toggleDone(done) {
		this.done = done
		return this
	}

	weight() {
		return this.done + this.createdDate.getTime().toString()
	}
}

export class ExpeditedTodo extends Todo {
	constructor(text, expedited) {
		super(text)
		this.expedited = expedited
	}

	weight() {
		return this.done + '' + !this.expedited + this.createdDate.getTime().toString()
	}

}