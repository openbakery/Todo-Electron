import React from 'react';

import { TodoList } from './TodoList';

export default class App extends React.Component {
  render() {
    return (<div>
      <h2>My Todos</h2>
      <TodoList />
    </div>);
  }
}
