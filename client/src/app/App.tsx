import AddTodo from "features/todoList/AddTodo";
import "../App.css";
import TodoList from "features/todoList/TodoList";
import Footer from "features/visibilityFilter/Footer";
import { FormEvent, MouseEvent, useEffect } from "react";
import { loadTodos } from "features/todoList/todoSlice";
import { useAppDispatch } from "./store";
import { Register } from "features/user/Register";
import { Login } from "features/user/Login";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Account } from "features/user/Account";
import FreeComponent from "features/test/FreeComponent";
import AuthComponent from "features/test/AuthComponent";
import { ProtectedRoutes } from "./ProtectedRoute";
import { UpdateRelationPage } from "features/user/UpdateRelationPage";
import { fetchMe, removeMe } from "features/user/userSlice";
import { Button, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./rootReducer";
import { DisplayRelationsPage } from "features/user/DisplayRelationsPage";
import { VerifiedLogin } from "features/user/VerifiedLogin";

function App() {
  const dispatch = useAppDispatch();
  const me = useSelector((state: RootState) => state.user.me);

  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      dispatch(fetchMe());
    }
  }, [dispatch]);
  const navigate = useNavigate();
  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("TOKEN");
    dispatch(removeMe());
    navigate("/");
  };
  return (
    <Container>
      <Grid container spacing={2} paddingY={2}>
        <Grid item >
          <Link to="/comrades">Comrades</Link>
        </Grid>
        <Grid item >
          <Link to="/update-relation">Update Relation</Link>
        </Grid>
        {me.name && (
          <>
            <Grid xs={4} item>
              <Link to="/me">{me.name.replaceAll("_", " ")}</Link>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                onClick={(e: MouseEvent) => handleLogout(e)}
              >
                Logout
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Routes>
        <Route path="comrades" element={<DisplayRelationsPage />}>
          <Route path=":name" element={<DisplayRelationsPage />} />
        </Route>
        <Route path="/login" element={<VerifiedLogin />} />
        <Route
          path="update-relation"
          element={
            <ProtectedRoutes>
              <UpdateRelationPage />
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
