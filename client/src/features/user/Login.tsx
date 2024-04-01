import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifiedLogin } from "./VerifiedLogin";
import { NewUserLogin } from "./NewUserLogin";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

export const Login = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const partners = useSelector((state: RootState) => state.user.partners);

  const handleRadioChange = (val: string) => {
    const value = val === "true";
    setIsNewUser(value);
  };

  if (partners[0] && partners[1] && partners[2] && partners[3]) {
    return <VerifiedLogin />
  }
  return (
    <>
      <Typography>ЗАФІКСОВАНО НАСТУПНУ ОСОБУ:</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={isNewUser}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleRadioChange(e.target.value)
        }
      >
        <FormControlLabel value="false" control={<Radio />} label="Я" />
        <FormControlLabel value="true" control={<Radio />} label="РЕКРУТЕР" />
      </RadioGroup>
      {isNewUser ? <NewUserLogin  /> : <VerifiedLogin />}
    </>
  );
};
