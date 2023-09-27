import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
const Search =({ searchQuery, setSearchQuery, isSearchVisible, setIsSearchVisible })=> {
  return (
<div className='searchContainer'>
        {!isSearchVisible ? (
          <SearchIcon
            className='searchButton'
            onClick={() => setIsSearchVisible(true)}
          >
            Search
          </SearchIcon>
        ) : (
          <div className='search-input'>
            <SearchIcon
              className='searchButton'
              onClick={() => setIsSearchVisible(false)}
            >
              Search
            </SearchIcon>
            <input
              type='text'
              className={`searchInput ${isSearchVisible ? 'visible' : ''}`}
              placeholder='Search tasks'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>
  )
}

export default Search


