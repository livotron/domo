import {
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
import { ChangeEvent, useState } from "react";

export const WritePost = () => {
  const [level, setLevel] = useState(8);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(Number(event.target.value));
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
          setTitle(event.target.value)
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
    </div>
  );
};
