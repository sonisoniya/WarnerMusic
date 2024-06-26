import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';


type CustomInputProps = {
    onValueChange: (value: string) => void;
  };

export default function CustomInput({ onValueChange }: CustomInputProps) {
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onValueChange(newValue); 
    };
  
    const handleClear = () => {
        setValue('');
        onValueChange('');
    };
  
    return (
        <TextField
          id="custom-textfield"
          variant="outlined"
          placeholder="Type your choice"
          InputLabelProps={{ shrink: false }}
          value={value}
          sx={{width:'200px'}}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {value && (
                  <IconButton size='small' onClick={handleClear} edge="end">
                    <ClearIcon sx={{fontSize:'18px'}} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
    );
}
