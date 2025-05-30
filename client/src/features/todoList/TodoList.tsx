import React from 'react'
import TodoListItem from './TodoListItem'
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store';
import { toggleTodo } from './todoSlice';
import { VisibilityFilter } from 'features/visibilityFilter/visibilityFilterSlice';
import { Todo } from './types';

const getVisibleTodos = (todos: Todo[], filter: VisibilityFilter) => {
  switch (filter) {
    case VisibilityFilter.ShowAll:
      return todos
    case VisibilityFilter.ShowCompleted:
      return todos.filter(t => t.completed)
    case VisibilityFilter.ShowActive:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}


export default function TodoList() {
  const todos = useSelector(
      (state: RootState) => getVisibleTodos(state.todos, state.visibilityFilter
        )
  );
  const dispatch = useAppDispatch();

  return (
    <ul>
      {todos.map(todo => (
        <TodoListItem 
          key={todo.id} 
          {...todo}
          onClick={() => dispatch(toggleTodo(todo))}
          />
      ))}
    </ul>
  );
}