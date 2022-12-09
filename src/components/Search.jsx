import React from 'react'
import { FaSistrix, FaMicrophone } from 'react-icons/fa'
import { useState } from 'react'

const Search = () => {
  const [query, setQuery] = useState('');

  const persistQuery = (e) => {
    setQuery(e.target.value)
    localStorage.setItem('q', e.target.value);
  }

  return (

    <div className="search">
      <div className="app__logo">
        <h1 className="app_icon home_icon">Medisearch</h1>
      </div>
      <form action='/search' className="search__form">
        <input type="text" className="search__input" value={query} onChange={persistQuery} required />
        <div className="search__group">
          <input type="submit" className="search__btn" value="MediSearch" />
        </div>
        <FaSistrix className="search__icon" />
        <FaMicrophone className="search__microphone" />
      </form>
    </div>

  )
}

export default Search