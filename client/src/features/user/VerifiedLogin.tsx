import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { DisplayPartners } from "./DisplayPartners";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Direction, VerifyUserClient } from "./types";
import { useAppDispatch } from "app/store";
import { login } from "./userSlice";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";

export const VerifiedLogin = () => {
  // const [userName, setUserName] = useState<string>("");
  const userName = useSelector((state: RootState) => state.user.user.name);
  const partners = useSelector((state: RootState) => state.user.partners);

  const [loginState, setLoginState] = useState<VerifyUserClient[]>([
    { partnerName: "", password: "", direction: Direction.up },
    { partnerName: "", password: "", direction: Direction.right },
    { partnerName: "", password: "", direction: Direction.down },
    { partnerName: "", password: "", direction: Direction.left },
  ]);

  const setPartnerField = (
    value: string,
    direction: Direction,
    isPassword: boolean
  ) => {
    switch (direction) {
      case Direction.up:
        setLoginState([
          {
            direction: loginState[0].direction,
            partnerName: isPassword ? loginState[0].partnerName : value,
            password: isPassword ? value : loginState[0].password,
          },
          loginState[1],
          loginState[2],
          loginState[3],
        ]);
        break;
      case Direction.right:
        setLoginState([
          loginState[0],
          {
            direction: loginState[1].direction,
            partnerName: isPassword ? loginState[1].partnerName : value,
            password: isPassword ? value : loginState[1].password,
          },
          loginState[2],
          loginState[3],
        ]);
        break;
      case Direction.down:
        setLoginState([
          loginState[0],
          loginState[1],
          {
            direction: loginState[2].direction,
            partnerName: isPassword ? loginState[2].partnerName : value,
            password: isPassword ? value : loginState[2].password,
          },
          loginState[3],
        ]);
        break;
      case Direction.left:
        setLoginState([
          loginState[0],
          loginState[1],
          loginState[2],
          {
            direction: loginState[3].direction,
            partnerName: isPassword ? loginState[3].partnerName : value,
            password: isPassword ? value : loginState[3].password,
          },
        ]);
        break;
    }
  };
  const dispatch = useAppDispatch();
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    const filledLoginEntitys = loginState.filter(
      (logEnt) => logEnt.partnerName && logEnt.password
    );
    const loginProps = filledLoginEntitys.map((logEnt) => ({
      direction: logEnt.direction,
      partnerName: logEnt.partnerName,
      hash: logEnt.password,
    }));
    dispatch(login({ verifications: loginProps, name: userName }));
  };
  return (
    <>
      <FormControl>
        {/* <TextField
          required
          id="username"
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setUserName(event.target.value)
          }
        /> */}
        {loginState.map((loginEntity, index) => (
          <Box style={{ display: partners[index] ? "block" :"none" }} key={loginEntity.direction}>
            <Typography variant="h3">{loginEntity.direction}</Typography>
            <TextField
              id={`partner-name-${loginEntity.direction}`}
              label="Partner Name"
              variant="outlined"
              value={loginEntity.partnerName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPartnerField(
                  event.target.value,
                  loginEntity.direction,
                  false
                )
              }
            />
            <TextField
              required
              id={`partner-password-${loginEntity.direction}`}
              label="Password"
              variant="outlined"
              value={loginEntity.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPartnerField(event.target.value, loginEntity.direction, true)
              }
            />
          </Box>
        ))}
        <Button
          type="submit"
          variant="contained"
          onClick={(e: MouseEvent) => handleSubmit(e)}
        >
          Login
        </Button>
      </FormControl>
    </>
  );
};
