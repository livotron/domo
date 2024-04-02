import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Direction, getOppositeDirection } from "./types";
import { RootState } from "app/rootReducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import { login } from "./userSlice";
import { SearchUser } from "./SearchUser";

export const NewUserLogin = () => {
  const [partnerName, setPartnerName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmProhibited, setConfirmProhibited] = useState(false);

  const { user, loginError, loginLoading } = useSelector(
    (state: RootState) => state.user
  );
  const partners = useSelector((state: RootState) => state.user.partners);
  const initialRadiobutton = Direction.up;
  const [radiobutton, setRadiobutton] = useState<Direction>(initialRadiobutton);

  const handleRadiobuttonChange = (e: ChangeEvent<HTMLInputElement>) => {
    const radiobuttonDirection = e.target.value as Direction;
    e.preventDefault();
    setConfirmProhibited(false);
    setRadiobutton(radiobuttonDirection);
  };

  const handleSearchedUser = (name: string | null) => {
    if (!name) return;
    setConfirmProhibited(false);
    setPartnerName(name);
  };

  const handlePasswordChanged = (password: string) => {
    setConfirmProhibited(false);
    setPassword(password);
  };
  useEffect(() => {
    if (loginError) setConfirmProhibited(true);
  }, [loginError]);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(
      login({
        name: user.name,
        verifications: [
          {
            direction: radiobutton,
            hash: password,
            partnerName: partnerName,
          },
        ],
      })
    );
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        ПОЛОЖЕННЯ ВАШОГО РЕКРУТЕРА:
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={radiobutton}
        onChange={(e) => handleRadiobuttonChange(e)}
      >
        <FormControlLabel
          value={Direction.up}
          // style={{ display: partners[0] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="ЗГОРИ"
        />
        <FormControlLabel
          value={Direction.right}
          // style={{ display: partners[1] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="СПРАВА"
        />
        <FormControlLabel
          value={Direction.down}
          // style={{ display: partners[2] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="ЗНИЗУ"
        />
        <FormControlLabel
          value={Direction.left}
          // style={{ display: partners[3] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="ЗЛІВА"
        />
      </RadioGroup>
      <SearchUser getSearchedUser={handleSearchedUser} />
      <TextField
        size="small"
        id="password-field"
        label="ПАРОЛЬ"
        variant="outlined"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handlePasswordChanged(event.target.value)
        }
      />
      <Button
        disabled={
          !password || !partnerName || loginLoading || confirmProhibited
        }
        type="submit"
        variant="contained"
        onClick={(e: MouseEvent) => handleSubmit(e)}
      >
        {confirmProhibited ? "НЕ ПІДТВЕРДЖЕНО" : "ПІДТВЕРДИТИ"}
      </Button>
    </FormControl>
  );
};
