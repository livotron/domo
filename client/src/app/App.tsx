import AddTodo from "features/todoList/AddTodo";
import "../App.css";
import TodoList from "features/todoList/TodoList";
import Footer from "features/visibilityFilter/Footer";
import { useEffect } from "react";
import { loadTodos } from "features/todoList/todoSlice";
import { useAppDispatch } from "./store";
import { Register } from "features/user/Register";
import { Login } from "features/user/Login";
import { Link, Route, Routes } from "react-router-dom";
import { Account } from "features/user/Account";
import FreeComponent from "features/test/FreeComponent";
import AuthComponent from "features/test/AuthComponent";
import { ProtectedRoutes } from "./ProtectedRoute";
import { UpdateRelationForm } from "features/user/UpdateRelationForm";
import { fetchMe } from "features/user/userSlice";
import { Container, Grid } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={1} item>Д</Grid>
        <Grid item>
          <Link to="/">Home</Link>
        </Grid>
        <Grid xs={2} item>
          <Link to="/update-relation">Update Relation</Link>
        </Grid>
        <Grid xs={2} item>
          <Link to="/free">Free Component</Link>
        </Grid>
        <Grid xs={2} item>
          <Link to="/auth">Auth Component</Link>
        </Grid>
      </Grid>
      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/free" element={<FreeComponent />} />
        <Route
          path="update-relation"
          element={
            <ProtectedRoutes>
              <UpdateRelationForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/auth"
          element={
            <ProtectedRoutes>
              <AuthComponent />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
