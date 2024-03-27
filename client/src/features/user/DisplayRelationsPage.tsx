import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { DisplayPartners } from "./DisplayPartners";
import { useAppDispatch } from "app/store";
import { fetchByName } from "./userSlice";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

export const DisplayRelationsPage = () => {
  const dispatch = useAppDispatch();
  const [ searchedUser, setSearchedUser ] = useState<string>("");
  const fetchedUserName = useSelector((state: RootState) => state.user.user.name)
  // useEffect(() => {
  //   dispatch(fetchByName("First"));
  // }, []);

  const handleSearch = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(fetchByName(searchedUser));

  }
  return (
    <>
      <DisplayPartners userName={fetchedUserName} />
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
      <Button
        type="submit"
        variant="contained"
        onClick={(e: MouseEvent) => handleSearch(e)}
      >
        Search
      </Button>
    </>
  );
};
