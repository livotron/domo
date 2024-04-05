import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Direction } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useAppDispatch } from "app/store";
import { verifyPartner } from "./userSlice";
import { SearchUser } from "./SearchUser";

export const ValidateForm = () => {
  const [radiobutton, setRadiobutton] = useState<Direction>(Direction.up);
  const [partnerName, setPartnerName] = useState("");
  const [password, setPassword] = useState("");
  const [isNewPartner, setIsNewPartner] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const radiobuttonDirection = e.target.value as Direction;
    e.preventDefault();
    setIsInitiated(false);
    setRadiobutton(radiobuttonDirection);
  };
  const dispatch = useAppDispatch();
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setIsInitiated(true);
    dispatch(
      verifyPartner({
        partnerName: partnerName.trim().replaceAll(" ", "_"),
        direction: radiobutton,
        hash: password,
      })
    );
  };

  const handlePartnerChange = (name: string) => {
    setIsInitiated(false);
    setPartnerName(name);
  };

  const handlePasswordChange = (pass: string) => {
    setIsInitiated(false);
    setPassword(pass);
  };
  return (
    <FormControl>
      <Typography variant="subtitle1">ОБНОВИТИ КОНТАКТ</Typography>

      <FormLabel id="demo-radio-buttons-group-label">ЗА НАПРЯМКОМ:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={radiobutton}
        onChange={(e) => handleChange(e)}
      >
        <FormControlLabel
          value={Direction.up}
          control={<Radio />}
          label="ЗГОРИ"
        />
        <FormControlLabel
          value={Direction.right}
          control={<Radio />}
          label="СПРАВА"
        />
        <FormControlLabel
          value={Direction.down}
          control={<Radio />}
          label="ЗНИЗУ"
        />
        <FormControlLabel
          value={Direction.left}
          control={<Radio />}
          label="ЗЛІВА"
        />
      </RadioGroup>
      <FormControlLabel
        control={
          <Switch
            checked={isNewPartner}
            onChange={(e) => setIsNewPartner(e.target.checked)}
          />
        }
        label="НОВОПРИБУЛИЙ"
      />
      {isNewPartner ? (
        <TextField
          size="small"
          id="partner-name-field"
          label="ПОВНЕ ІМʼЯ"
          variant="outlined"
          value={partnerName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handlePartnerChange(event.target.value.toUpperCase())
          }
        />
      ) : (
        <SearchUser
          searchContext={user.name}
          getSearchedUser={(user) => handlePartnerChange(user || "")}
        />
      )}
      <TextField
        size="small"
        id="password-field"
        label="ПАРОЛЬ"
        variant="outlined"
        value={password}
        inputProps={{ maxLength: 44 }}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handlePasswordChange(event.target.value.trim())
        }
      />
      <Button
        type="submit"
        variant="contained"
        onClick={(e: MouseEvent) => handleSubmit(e)}
        disabled={isInitiated || !partnerName || !password}
      >
        {isInitiated ? "ЗКОНТАКТОВАНО" : "ЗКОНТАКТУВАТИСЬ"}
      </Button>
    </FormControl>
  );
};
