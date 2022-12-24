import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import axios from "axios";
import baseUrl from "../base/baseurl";

const Search = () => {
    const [studentsList,setStudentsList]=useState()
    const loadData=()=>{
        axios.get(baseUrl("/food/"))
        .then((res)=>setStudentsList(res.data))
        .catch((error)=>console.log(error))
    }
  

  const [list, setList] = useState(studentsList);
  const [view, setView] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData(e.target.value);
    setView(true);
    if (data !== "") {
      const filtername = list.filter((value) => {
        return value.name.toLowerCase().startsWith(data.toLowerCase());
      });
      setList(filtername);
    } else {
      setList(studentsList);
    }
  };

//   const handleClick = (name) => {
//     navigate(`/${name}`);
//   };

  useEffect(()=>loadData(),[])
  return (
    <>
      <center>
        <h1>search details</h1>
        <TextField
          type="search"
          label="search"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {/* <SearchIcon onClick={() => handleClick(data)} /> */}
              </InputAdornment>
            ),
          }}
        />

        {view ? (
          <div>
            {list?.map((value) => (
              <p style={{color:"black"}} >{value.name}</p>
            ))}
          </div>
        ) : (
          <></>
        )}
      </center>
    </>
  );
};
export default Search;