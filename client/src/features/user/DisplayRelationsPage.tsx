import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { DisplayPartners } from "./DisplayPartners";
import { useAppDispatch } from "app/store";
import { fetchByName, fetchMe, fetchPartners, receiveUser, toggleIsFixed } from "./userSlice";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { FixedRelationsMenu } from "./FixedRelationsMenu";
import { Login } from "./Login";
import { SearchUser } from "./SearchUser";
import { useNavigate, useParams } from "react-router-dom";

export const DisplayRelationsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const me = useSelector((state: RootState) => state.user.me);
  const centralUser = useSelector((state: RootState) => state.user.user);
  const handleSearch = (searchedUser: string | null) => {
    if (searchedUser) {
      // dispatch(fetchByName(searchedUser));
      navigate(`/comrades/${searchedUser}`);
    }
  };
  const { name } = useParams();

  useEffect(() => {
    if (name) {
      console.log("navigating by params");
      dispatch(receiveUser({ name }));
      dispatch(fetchPartners());
    }
  }, [name]);
  const handleMeClicked = (e: MouseEvent) => {
    e.preventDefault();
    // dispatch(receiveUser(me));
    navigate(`/comrades/${me.name}`);
  };
  return (
    <>
      {/* <TextField
        required
        id="search-user"
        label="Search for user"
        variant="outlined"
        value={searchedUser}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchedUser(event.target.value)
        }
      />
      <Button variant="contained" onClick={(e: MouseEvent) => handleSearch(e)}>
        Шукати
      </Button> */}
      <SearchUser getSearchedUser={handleSearch} />
      <Button
        disabled={!me.name}
        variant="contained"
        onClick={(e: MouseEvent) => handleMeClicked(e)}
      >
        Я
      </Button>
      <DisplayPartners />

      {centralUser.name && (me.name ? <FixedRelationsMenu /> : <Login />)}
    </>
  );
};
