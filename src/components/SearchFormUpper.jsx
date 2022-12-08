import React, { useState } from 'react'
import { FaSistrix, FaMicrophone } from 'react-icons/fa'

const SearchFormUpper = () => {
    const [query, setQuery] = useState(localStorage.getItem('q'))
    const persistQuery = (e) => {
        setQuery(e.target.value)
        localStorage.setItem('q', e.target.value);
    }


    return (
        <div className="search_upper__form">
            <div className="app__form-logo">
                <h3 className='app_icon'>Medisearch</h3>
            </div>
            <div className="search_upper__form-input">
                <form className="search__form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        className="search__input"
                        value={query}
                        onChange={persistQuery}
                        required
                    />
                    <FaSistrix className="search__icon" />
                    <FaMicrophone className="search__microphone" />
                </form>
            </div>
        </div>
    )
}

export default SearchFormUpper