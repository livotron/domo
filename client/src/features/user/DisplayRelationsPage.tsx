import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { DisplayPartners } from "./DisplayPartners";
import { useAppDispatch } from "app/store";
import { fetchByName, fetchMe, receiveUser } from "./userSlice";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

export const DisplayRelationsPage = () => {
  const dispatch = useAppDispatch();
  const [searchedUser, setSearchedUser] = useState<string>("");
  // useEffect(() => {
  //   dispatch(fetchByName("First"));
  // }, []);
  const me = useSelector((state: RootState) => state.user.me);

  const handleSearch = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(fetchByName(searchedUser));
  };

  const handleMeClicked = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(receiveUser(me));
  };
  return (
    <>
      <TextField
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
        Search
      </Button>
      <Button disabled={!me.name} variant="contained" onClick={(e: MouseEvent) => handleMeClicked(e)}>
        Я
      </Button>
      <DisplayPartners />
    </>
  );
};
