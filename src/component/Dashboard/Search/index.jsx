import React from 'react'
import './styles.css'
import SearchRoundedIcon from '@mui/icons-material/Search';

function Search({search, onSeacrhChange}) {
  return (
    <div className='search-flex'>
      <SearchRoundedIcon />
      <input type='text'
        placeholder='Search'
        value={search}
        onChange={(e) => onSeacrhChange(e)} />
    </div>
  )
}

export default Search
