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
import { Link, Route, Routes } from "react-router-dom";
import { Account } from "features/user/Account";
import FreeComponent from "features/test/FreeComponent";
import AuthComponent from "features/test/AuthComponent";
import { ProtectedRoutes } from "./ProtectedRoute";

function App() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(loadTodos());
  // }, [dispatch])
  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <Link to="/">Home</Link>
            <Link to="/free">Free Component</Link>
            <Link to="/auth">Auth Component</Link>
          </section>
        </Col>
      </Row>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/free" element={<FreeComponent />} />
        <Route
          path="/auth"
          element={
            <ProtectedRoutes>
              <AuthComponent />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
