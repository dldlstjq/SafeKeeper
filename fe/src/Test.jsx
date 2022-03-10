import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

export function ComboBox() {
  const [company, setCompany] = useState('')

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={companies}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="회사선택" />}
      onChange={(e)=>{setCompany(e.target.innerText); console.log(e.target.innerText)}}
      isOptionEqualToValue={(o,v)=>o.id===v.id}
    />
  );
}

const companies = [
  {label:'samsung', id:0},
  {label:'LG', id:1},
  {label:'KT', id:2},
]
