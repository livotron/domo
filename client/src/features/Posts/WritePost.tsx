import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "app/store";
import { ChangeEvent, MouseEvent, useState } from "react";
import { createPost } from "./postsSlice";

export const WritePost = () => {
  const [level, setLevel] = useState(8);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(Number(event.target.value));
  };
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    dispatch(createPost({ title, text: content, level }));
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">ПЕРІОД</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level.toString()}
          label="ПЕРІОД"
          onChange={handleLevelChange}
        >
          <MenuItem value={8}>ДОБА</MenuItem>
          <MenuItem value={7}>3 ДОБИ</MenuItem>
          <MenuItem value={6}>ТИЖДЕНЬ</MenuItem>
          <MenuItem value={5}>2 ТИЖНІ</MenuItem>
          <MenuItem value={4}>МІСЯЦЬ</MenuItem>
          <MenuItem value={3}>КВАРТАЛ</MenuItem>
          <MenuItem value={2}>ПІВРІЧЧЯ</MenuItem>
          <MenuItem value={1}>РІК</MenuItem>
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
        disabled={false}
      >
        ЗАПОСТИТИ
      </Button>
    </div>
  );
};
