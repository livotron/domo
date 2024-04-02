import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Direction } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useAppDispatch } from "app/store";
import { verifyPartner } from "./userSlice";

export const ValidateForm = () => {
  const [radiobutton, setRadiobutton] = useState<Direction>(Direction.up);
  const [partnerName, setPartnerName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userName = useSelector((state: RootState) => state.user.user.name);
  const partners = useSelector((state: RootState) => state.user.partners);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const radiobuttonDirection = e.target.value as Direction;
    e.preventDefault();
    setRadiobutton(radiobuttonDirection);

    switch (radiobuttonDirection) {
      case Direction.up:
        partners[0] && setPartnerName(partners[0].name);
        break;
      case Direction.right:
        partners[1] && setPartnerName(partners[1].name);
        break;
      case Direction.down:
        partners[2] && setPartnerName(partners[2].name);
        break;
      case Direction.up:
        partners[3] && setPartnerName(partners[3].name);
        break;
    }
  };
  const dispatch = useAppDispatch();
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(
      verifyPartner({ partnerName, direction: radiobutton, hash: password })
    );
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={radiobutton}
        onChange={(e) => handleChange(e)}
      >
        <FormControlLabel value={Direction.up} control={<Radio />} label="Up" />
        <FormControlLabel
          value={Direction.right}
          control={<Radio />}
          label="Right"
        />
        <FormControlLabel
          value={Direction.down}
          control={<Radio />}
          label="Down"
        />
        <FormControlLabel
          value={Direction.left}
          control={<Radio />}
          label="Left"
        />
      </RadioGroup>
      <TextField
        required
        id="partner-name-field"
        label="Partner"
        variant="outlined"
        value={partnerName}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPartnerName(event.target.value)
        }
      />
      <TextField
        required
        id="password-field"
        label="Password"
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
