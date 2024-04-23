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
import { WriteClaim } from "features/claims/WriteClaim";
import {
  fetchDive,
  removeClaims,
  setCurrentLevel,
} from "features/claims/slice";
import { ScrollClaims } from "features/claims/ScrollClaims";
import { getCurrentLevel } from "./utils";

function App() {
  const dispatch = useAppDispatch();
  const me = useSelector((state: RootState) => state.user.me);
  const { myDive: dive, currentLevel } = useSelector(
    (state: RootState) => state.claims
  );

  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      dispatch(fetchMe());
      dispatch(fetchDive());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!dive.level) return;
    dispatch(setCurrentLevel(getCurrentLevel(dive)));
    const interval = setInterval(() => {
      const newLevel = getCurrentLevel(dive);
      if (newLevel < currentLevel) dispatch(setCurrentLevel(newLevel));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, dive, currentLevel]);

  const navigate = useNavigate();
  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("TOKEN");
    dispatch(removeMe());
    dispatch(removeClaims());
    navigate("/");
  };
  return (
    <Container>
      <Grid container spacing={2} paddingY={2}>
        <Grid item xs="auto">
          <Link to="/comrades">ТОВАРИШІ</Link>
        </Grid>
        <Grid item xs="auto">
          <Link to="/update-relation">КОНТАКТИ</Link>
        </Grid>
        <Grid item xs="auto">
          <Link to="/claims">ПОСТИ</Link>
        </Grid>
        <Grid item xs="auto">
          <Link to="/claims/create">НАПИСАТИ</Link>
        </Grid>
        {me.name && (
          <>
            <Grid xs={4} item>
              <Link to="/me">{me.name.replaceAll("_", " ")}</Link>
            </Grid>
            <Grid item xs="auto">
              {currentLevel}
            </Grid>
            <Grid item xs="auto">
              <Button
                type="submit"
                variant="contained"
                onClick={(e: MouseEvent) => handleLogout(e)}
              >
                ВИХІД
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
        <Route path="claims">
          <Route
            path=""
            element={
              <ProtectedRoutes>
                <ScrollClaims />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="create"
            element={
              <ProtectedRoutes>
                <WriteClaim />
              </ProtectedRoutes>
            }
          />
        </Route>
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
