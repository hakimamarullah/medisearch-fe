import React, { useEffect, useState } from 'react'
import SearchResult from '../components/SearchResult';
import { FaSistrix, FaMicrophone } from 'react-icons/fa'
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


const SearchPage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState(localStorage.getItem('q'))
    const [total, setTotal] = useState(0)
    const [queryTime, setQueryTime] = useState(0)
    const [results, setResults] = useState([])
    const navigate = useNavigate()

    const persistQuery = (e) => {
        setQuery(e.target.value)
        localStorage.setItem('q', e.target.value);
    }

    const topDoc = () => {
        return JSON.parse(localStorage.getItem('top'))
    }

    const goHome = (e) => {
        e.preventDefault()
        navigate('/')
    }

    const search = (e) => {
        e.preventDefault();
        setPage(1)
        const start = performance.now()
        axios.get(`${process.env.REACT_APP_API_URL}/search?q=${query}&page=${page}&size=10`)
            .then((res) => {
                setResults(res.data.items);
                setTotal(res.data.total);
                if (page === 1) {
                    localStorage.setItem('top', JSON.stringify(res.data.items[0]))
                }
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
        axios.get(`${process.env.REACT_APP_API_URL}/search?q=${query}&page=${page}&size=10`)
            .then((res) => {
                setResults(res.data.items);
                if (page === 1) {
                    localStorage.setItem('top', JSON.stringify(res.data.items[0]))
                    setTotal(res.data.total);
                }
            })
            .then(window.scrollTo({ top: 0, behavior: 'smooth' }))
            .catch((err) => console.log(err))
        const end = performance.now()
        setQueryTime(end - start)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <div className="search_page">
            <div className="search_upper__form">
                <div className="app__form-logo">
                    <h3 className='app_icon link-home' onClick={goHome}>Medisearch</h3>
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
                    {results?.map((doc, index) => (
                        <SearchResult key={index} score={doc.score} doc_id={doc.doc_id} content={doc.contents} />
                    ))}
                </div>
                <div className="top-document">
                    <SearchResult score={topDoc()?.score} doc_id={topDoc()?.doc_id} content={topDoc()?.contents} top />
                </div>
            </div>
            <div className="page-navigation">
                <Pagination count={Math.ceil(total / 10)} page={page} variant="outlined" color="primary" onChange={handlePageChange} />
            </div>
            <Footer />
        </div>
    )
}

export default SearchPage