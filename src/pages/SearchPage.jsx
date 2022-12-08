import React, { useEffect, useState } from 'react'
import SearchResult from '../components/SearchResult';
import { FaSistrix, FaMicrophone } from 'react-icons/fa'
import Pagination from '@mui/material/Pagination';
import axios from 'axios';

const SearchPage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState(localStorage.getItem('q'))
    const [total, setTotal] = useState(0)
    const [queryTime, setQueryTime] = useState(0)
    const [results, setResults] = useState([])
    const persistQuery = (e) => {
        setQuery(e.target.value)
        localStorage.setItem('q', e.target.value);
    }

    const search = async (e) => {
        e.preventDefault();
        setPage(1)
        const start = performance.now()
        axios.get(`http://localhost:9009/search?q=${query}&page=${page}&size=10`)
            .then((res) => {
                setResults(res.data.items); console.log(res.data.page);
                setTotal(res.data.total)
            })
            .catch((err) => console.log(err))
        const end = performance.now()
        setQueryTime(end - start)
    };
    const handlePageChange = (event, value) => {
        setPage(value)
    }
    useEffect(() => {
        const start = performance.now()
        axios.get(`http://localhost:9009/search?q=${query}&page=${page}&size=10`)
            .then((res) => {
                setResults(res.data.items);
                setTotal(res.data.total);
            })
            .catch((err) => console.log(err))
        const end = performance.now()
        setQueryTime(end - start)
    }, [page])

    return (
        <div className="search_page">
            <div className="search_upper__form">
                <div className="app__form-logo">
                    <h3 className='app_icon'>Medisearch</h3>
                </div>
                <div className="search_upper__form-input">
                    <form className="search__form" onSubmit={search}>
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
            <div className="description">
                <p>Fetched results in {queryTime} ms</p>
                <p>Total documents: {total}</p>
            </div>
            <div className="snippets">

                <div className="results-list">
                    {results.map((doc, index) => (
                        <SearchResult key={index} score={doc.score} doc_id={doc.doc_id} content={doc.contents} />
                    ))}
                </div>
                <div className="top-document">
                    <SearchResult score={results[0]?.score} doc_id={results[0]?.doc_id} content={results[0]?.contents} top/>
                </div>
            </div>
            <div className="page-navigation">
                <Pagination count={10} page={page} variant="outlined" color="primary" onChange={handlePageChange} />
            </div>
        </div>
    )
}

export default SearchPage