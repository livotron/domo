import AddTodo from "features/todoList/AddTodo";
import "../App.css";
import TodoList from "features/todoList/TodoList";
import Footer from "features/visibilityFilter/Footer";
import { useEffect } from "react";
import { loadTodos } from "features/todoList/todoSlice";
import { useAppDispatch } from "./store";
import { Col, Container, Row } from "react-bootstrap";
import { Register } from "features/user/Register";
import { Login } from "features/user/Login";

function App() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(loadTodos());
  // }, [dispatch])
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Register />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Login />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
