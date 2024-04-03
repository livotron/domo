import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "./types";
import { searchUsersByName } from "./userApi";
import { useAppDispatch } from "app/store";
import { fetchByName } from "./userSlice";

interface Props {
  getSearchedUser: (user: string | null) => void;
  searchContext: string;
}
export const SearchUser = ({ getSearchedUser, searchContext }: Props) => {
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOptions([]);
    setValue(null);
    setInputValue("");
  }, [searchContext]);
  const handleInputValueChange = (newInputValue: string) => {
    const inputValueCapitalized = newInputValue.toUpperCase();
    if (inputValueCapitalized.length === 0) setOptions([]);
    if (
      (inputValueCapitalized.length === 3 && inputValue.length < 3) ||
      (inputValueCapitalized.length > 3 &&
        inputValueCapitalized.substring(0, 3) !== inputValue.substring(0, 3))
    ) {
      setLoading(true);
      searchUsersByName(inputValueCapitalized.substring(0, 3)).then(
        (res): void => {
          setOptions(res.map((user) => user.name.replaceAll("_", " ")));
          setLoading(false);
          console.log(res);
        }
      );
    }
    setInputValue(inputValueCapitalized);
  };
  const handleValueChange = (newValue: string | null) => {
    const underscoredValue = newValue?.replaceAll(" ", "_") || null;
    setValue(underscoredValue);
    getSearchedUser(underscoredValue);
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
