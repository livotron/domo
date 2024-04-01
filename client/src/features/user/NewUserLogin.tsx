import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Direction, getOppositeDirection } from "./types";
import { RootState } from "app/rootReducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store";
import { login } from "./userSlice";

export const NewUserLogin = () => {
  const [myName, setMyName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userName = useSelector((state: RootState) => state.user.user.name);
  const partners = useSelector((state: RootState) => state.user.partners);
  const initialRadiobutton = partners[0]
    ? partners[1]
      ? partners[2]
        ? Direction.right
        : Direction.up
      : Direction.left
    : Direction.down;
  const [radiobutton, setRadiobutton] = useState<Direction>(initialRadiobutton);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const radiobuttonDirection = e.target.value as Direction;
    e.preventDefault();
    setRadiobutton(radiobuttonDirection);
  };
  const dispatch = useAppDispatch();
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(
      login({
        name: myName,
        verifications: [
          {
            direction: radiobutton,
            hash: password,
            partnerName: userName,
          },
        ],
      })
    );
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        ВАШЕ ПОЛОЖЕННЯ ВІДНОСНО РЕКРУТЕРА:
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={radiobutton}
        onChange={(e) => handleChange(e)}
      >
        <FormControlLabel
          value={Direction.down}
          style={{ display: partners[0] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="ЗГОРИ"
        />
        <FormControlLabel
          value={Direction.left}
          style={{ display: partners[1] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="СПРАВА"
        />
        <FormControlLabel
          value={Direction.up}
          style={{ display: partners[2] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="ЗНИЗУ"
        />
        <FormControlLabel
          value={Direction.right}
          style={{ display: partners[3] ? "none" : "inline-flex" }}
          control={<Radio />}
          label="ЗЛІВА"
        />
      </RadioGroup>
      <TextField
        required
        id="user-name-field"
        label="ВАШЕ ПОВНЕ ІМ'Я"
        variant="outlined"
        value={myName}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setMyName(event.target.value)
        }
      />
      <TextField
        required
        id="password-field"
        label="ПАРОЛЬ"
        variant="outlined"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPassword(event.target.value)
        }
      />
      <Button
        type="submit"
        variant="contained"
        onClick={(e: MouseEvent) => handleSubmit(e)}
      >
        Verify
      </Button>
    </FormControl>
  );
};
