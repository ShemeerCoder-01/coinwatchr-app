import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import './style.css';

interface SearchProps{
  search:string;
  onchangeSearch:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({search,onchangeSearch}) => {
  return (
    <div className='searchBar'>
        <SearchRoundedIcon className='searchIcon'/>
        <input type='text' placeholder='Search' onChange={(e)=> onchangeSearch(e)}/>
    </div>
  )
}

export default Search;