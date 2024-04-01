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
    {
      partnerName: partners[0]?.user.name || "",
      password: "",
      direction: Direction.up,
    },
    {
      partnerName: partners[1]?.user.name || "",
      password: "",
      direction: Direction.right,
    },
    {
      partnerName: partners[2]?.user.name || "",
      password: "",
      direction: Direction.down,
    },
    {
      partnerName: partners[3]?.user.name || "",
      password: "",
      direction: Direction.left,
    },
  ]);

  const setPartnerField = (value: string, direction: Direction) => {
    switch (direction) {
      case Direction.up:
        setLoginState([
          {
            ...loginState[0],
            password: value,
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
            ...loginState[1],
            password: value,
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
            ...loginState[2],
            password: value,
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
            ...loginState[3],
            password: value,
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
          <Box
            style={{ display: partners[index] ? "block" : "none" }}
            key={loginEntity.direction}
          >
            <Typography variant="subtitle1">{`${partners[index]?.user.name}`}</Typography>
            {/* <TextField
              id={`partner-name-${loginEntity.direction}`}
              label="Partner Name"
              variant="outlined"
              disabled
              value={partners[index]?.user.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPartnerField(
                  event.target.value,
                  loginEntity.direction,
                  false
                )
              }
            /> */}
            <TextField
              required
              id={`partner-password-${loginEntity.direction}`}
              label="Password"
              variant="outlined"
              value={loginEntity.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPartnerField(event.target.value, loginEntity.direction)
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
