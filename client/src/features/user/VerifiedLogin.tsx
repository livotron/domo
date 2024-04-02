import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { DisplayPartners } from "./DisplayPartners";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Direction, VerifyUserClient } from "./types";
import { useAppDispatch } from "app/store";
import { login } from "./userSlice";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

const getDirectionFromIndex = (index: number) => {
  switch (index) {
    case 0:
      return Direction.up;
    case 1:
      return Direction.right;
    case 2:
      return Direction.down;
    case 3:
      return Direction.left;
    default:
      return Direction.up;
  }
};

export const VerifiedLogin = () => {
  // const [userName, setUserName] = useState<string>("");
  const { user, loginError, loginLoading } = useSelector(
    (state: RootState) => state.user
  );
  const partners = useSelector((state: RootState) => state.user.partners);
  const [confirmProhibited, setConfirmProhibited] = useState(false);
  const [passwords, setPasswords] = useState<string[]>(["", "", "", ""]);
  const merged = partners.map((par, index) => ({
    ...par,
    password: passwords[index],
    direction: getDirectionFromIndex(index),
  }));
  const filtered = merged.filter((val) => val.name);
  const passwordFilled = filtered.reduce((prev, curr) => {
    if (!curr.password) {
      return false;
    }
    return prev;
  }, true);
  const setPassword = (value: string, index: number) => {
    const newPasswords = [...passwords];
    newPasswords[index] = value;
    setConfirmProhibited(false);
    setPasswords(newPasswords);
  };

  useEffect(() => {
    if (loginError) setConfirmProhibited(true);
  }, [loginError]);

  const dispatch = useAppDispatch();
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const loginProps = filtered.map((logEnt) => ({
      direction: logEnt.direction,
      partnerName: logEnt.name,
      hash: logEnt.password,
    }));
    dispatch(login({ verifications: loginProps, name: user.name }));
  };
  return (
    <>
      <FormControl>
        {partners.map((partner, index) => (
          <Box
            style={{ display: partner.name ? "block" : "none" }}
            key={`verification-${index}-${partner?.name}`}
          >
            <Typography variant="subtitle1">{`${partner.name}`}</Typography>
            <TextField
              size="small"
              label="ПАРОЛЬ"
              variant="outlined"
              value={passwords[index]}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value, index)
              }
            />
          </Box>
        ))}
        <Button
          type="submit"
          variant="contained"
          onClick={(e: MouseEvent) => handleSubmit(e)}
          disabled={loginLoading || !passwordFilled || confirmProhibited}
        >
          {loginLoading ? "ПІДТВЕРДЖУЮ..." :confirmProhibited ? "НЕ ПІДТВЕРДЖЕНО" : "ПІДТВЕРДИТИ"}
        </Button>
      </FormControl>
    </>
  );
};
