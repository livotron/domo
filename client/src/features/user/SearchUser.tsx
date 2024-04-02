import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { User } from "./types";
import { searchUsersByName } from "./userApi";
import { useAppDispatch } from "app/store";
import { fetchByName } from "./userSlice";

interface Props {
  getSearchedUser: (user: string | null) => void;
}
export const SearchUser = ({ getSearchedUser }: Props) => {
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputValueChange = (newInputValue: string) => {
    if (
      (newInputValue.length === 3 && inputValue.length < 3) ||
      (newInputValue.length > 3 &&
        newInputValue.substring(0, 3) !== inputValue.substring(0, 3))
    ) {
      setLoading(true);
      searchUsersByName(newInputValue.substring(0, 3)).then((res): void => {
        setOptions(res.map((user) => user.name));
        setLoading(false);
        console.log(res);
      });
    }
    setInputValue(newInputValue);
  };
  const handleValueChange = (newValue: string | null) => {
    setValue(newValue);
    getSearchedUser(newValue);
  };

  return (
    <div>
      <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        size="small"
        title="ІМ'Я КОРИСТУВАЧА"
        onChange={(event: any, newValue: string | null) => {
          handleValueChange(newValue);
        }}
        noOptionsText={
          inputValue
            ? loading
              ? "ЗАГРУЗКА"
              : inputValue.length < 3
                ? "ПРОДОВЖУЙТЕ ВВІД"
                : "НЕ ЗНАЙДЕНО"
            : "ВВЕДІТЬ ІМ'Я"
        }
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          handleInputValueChange(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="ПОШУК ПО ІМЕНІ" />
        )}
      />
    </div>
  );
};
