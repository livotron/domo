import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "app/store";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { createPost, getMyClaims } from "./slice";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import { DateTime } from "luxon";

const writeClaimItems = [
  { level: 8, title: "ДОБА", delta: { minutes: 5 } },
  { level: 7, title: "ТРИ ДОБИ", delta: { minutes: 15 } },
  { level: 6, title: "ТИЖДЕНЬ", delta: { minutes: 30 } },
  { level: 5, title: "ДВА ТИЖНІ", delta: { hours: 1 } },
  { level: 4, title: "МІСЯЦЬ", delta: { hours: 2 } },
  { level: 3, title: "КВАРТАЛ", delta: { hours: 4 } },
  { level: 2, title: "ПІВРІЧЧЯ", delta: { hours: 8 } },
  { level: 1, title: "РІК", delta: { hours: 16 } },
];

export const WriteClaim = () => {
  const [level, setLevel] = useState<"" | number>("");
  const [dateTimeNow, setDateTimeNow] = useState(DateTime.now());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { myClaims, myClaimsInitiated, loading } = useSelector(
    (state: RootState) => state.claims
  );
  const { name: userName } = useSelector((state: RootState) => state.user.me);
  const { level: diveLevel } = useSelector(
    (state: RootState) => state.claims.myDive
  );
  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(Number(event.target.value));
  };
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (level) dispatch(createPost({ title, text: content, level: level }));
    setLevel("");
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    const interval = setInterval(() => setDateTimeNow(DateTime.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!myClaimsInitiated && userName) dispatch(getMyClaims(userName));
  }, [dispatch, userName]);

  const fullClaimItems = useMemo(() => {
    const myClaimsDesc = [...myClaims].reverse();
    console.log("calculating...");
    return writeClaimItems.map((item) => {
      const lastPostIndex = myClaimsDesc.findIndex(
        (claim) => claim.level === item.level
      );
      if (lastPostIndex === -1) return { ...item, releaseAt: null };
      const releaseDateTime = DateTime.fromISO(
        myClaimsDesc[lastPostIndex].createdAt
      ).plus(item.delta);
      const releaseAt = releaseDateTime > dateTimeNow ? releaseDateTime : null;
      return { ...item, releaseAt };
    });
  }, [dateTimeNow, myClaims]);

  const menuItems = fullClaimItems.map((item) => (
    <MenuItem
      key={item.title}
      disabled={diveLevel < item.level || Boolean(item.releaseAt)}
      value={item.level}
    >
      {item.title}
      &nbsp;
      <Typography variant="caption">{`${diveLevel < item.level ? " (недостатній рівень)" : ""}${
        item.releaseAt
          ? ` (доступно через: ${item.releaseAt.diff(dateTimeNow, "hour").toFormat("d дн h год m хв")})`
          : ""
      }`}</Typography>
    </MenuItem>
  ));

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel size="small" id="demo-simple-select-label">
          ПЕРІОД
        </InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level?.toString()}
          label="ПЕРІОД"
          onChange={handleLevelChange}
        >
          {menuItems}
        </Select>
      </FormControl>
      <TextField
        size="small"
        id="title-field"
        label="ЗАГОЛОВОК"
        variant="outlined"
        value={title}
        inputProps={{ maxLength: 44 }}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value.toUpperCase())
        }
      />
      <br />
      <TextField
        size="small"
        id="content-field"
        label="ВМІСТ"
        variant="outlined"
        value={content}
        multiline
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setContent(event.target.value)
        }
      />
      <br />
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        disabled={!Boolean(level) || title.trim().length < 3}
      >
        ЗАПОСТИТИ
      </Button>
    </div>
  );
};
