import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import baseUrl from '../base/baseurl';
import { useEffect } from 'react';

export default function Playground() {
    const [studentsList,setStudentsList]=React.useState()
  const defaultProps = {
    options: studentsList,
    getOptionLabel: (option: FilmOptionType) => option.name,
  };
  const loadData=()=>{
    axios.get(baseUrl("/food/"))
    .then((res)=>setStudentsList(res.data))
    .catch((error)=>console.log(error))
}
  const flatProps = {
    options: studentsList?.map((option) => {
        return(
        <>
        <li>{option.name}</li>
        </>
    ) })
  };
  const [value, setValue] =React.useState()

 useEffect(()=>loadData(),[])

  return (
    <Stack spacing={1} sx={{ width: 400}}>
      <Autocomplete
      sx={{marginRight:"-800px",marginTop:"-100px",marginLeft:"900px"}}
        {...defaultProps}
        id="disable-close-on-select"
        
        renderInput={(params) => (
          <TextField {...params} label="disableCloseOnSelect" variant="standard" />
        )}
      />
      
    </Stack>
  );
}