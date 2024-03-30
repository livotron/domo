import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { MouseEvent } from "react";

export const FixedRelationsMenu = () => {
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      // value={radiobutton}
      // onChange={(e) => handleChange(e)}
    >
      <Box flexDirection="row">
        <FormControlLabel
          // value={Direction.up}
          control={<Radio />}
          label="Up"
        />
        <FormControlLabel
          // value={Direction.right}
          control={<Radio />}
          label="Right"
        />
        <FormControlLabel
          // value={Direction.down}
          control={<Radio />}
          label="Down"
        />
        <FormControlLabel
          // value={Direction.left}
          control={<Radio />}
          label="Left"
        />
      </Box>
    </RadioGroup>
  );
};
