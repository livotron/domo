import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { DisplayPartners } from "./DisplayPartners";
import { useAppDispatch } from "app/store";
import { fetchByName, fetchMe, receiveUser } from "./userSlice";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { FixedRelationsMenu } from "./FixedRelationsMenu";
import { Login } from "./Login";

export const DisplayRelationsPage = () => {
  const dispatch = useAppDispatch();
  const [searchedUser, setSearchedUser] = useState<string>("");
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const me = useSelector((state: RootState) => state.user.me);
  const centralUser = useSelector((state: RootState) => state.user.user);

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
        Шукати
      </Button>
      <Button
        disabled={!me.name}
        variant="contained"
        onClick={(e: MouseEvent) => handleMeClicked(e)}
      >
        Я
      </Button>
      <DisplayPartners />
      {centralUser.name && (
        <>
          <FormControlLabel
            style={{ userSelect: "none" }}
            control={
              <Switch checked={isFixed} onClick={() => setIsFixed(!isFixed)} />
            }
            label="ЗАФІКСУВАТИ"
          />
          {isFixed && (me.name ? <FixedRelationsMenu /> : <Login />)}
        </>
      )}
    </>
  );
};
