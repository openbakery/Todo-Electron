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

}