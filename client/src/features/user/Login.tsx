import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifiedLogin } from "./VerifiedLogin";

export const Login = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  const handleRadioChange = (val: string) => {
    const value = val === "true";
    setIsNewUser(value);
  };
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
        <FormControlLabel value="true" control={<Radio />} label="РЕКРУТЕР" />
        <FormControlLabel value="false" control={<Radio />} label="Я" />
      </RadioGroup>
      {isNewUser ? "something" : <VerifiedLogin />}
    </>
  );
};
