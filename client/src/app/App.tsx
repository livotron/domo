import AddTodo from 'features/todoList/AddTodo';
import '../App.css';
import TodoList from 'features/todoList/TodoList';
import Footer from 'features/visibilityFilter/Footer';
import { useEffect } from 'react';
import { loadTodos } from 'features/todoList/todoSlice';
import { useAppDispatch } from './store';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch])
  return (
    <div>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
