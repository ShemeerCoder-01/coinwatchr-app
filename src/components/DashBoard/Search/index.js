import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './style.css';


function Search({search,onchangeSearch}) {
  return (
    <div className='searchBar'>
        <SearchRoundedIcon className='searchIcon'/>
        <input type='text' placeholder='Search' onChange={(e)=> onchangeSearch(e)}/>
    </div>
  )
}

export default Search