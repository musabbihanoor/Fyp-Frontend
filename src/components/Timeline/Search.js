import React from "react";

const Search = () => {
  return (
    <div className='search'>
      <form>
        <input type='text' placeholder='Search' />
        <button type='submit'>
          <i className='fas fa-search'></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
