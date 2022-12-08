import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const SearchResult = (props) => {
    const navigate = useNavigate()
    const trimText = (text) => {
        if (text.length > 200) {
            return text.substring(0, 200).trimEnd() + " ..."
        }
        else {
            return text
        }
    }

    const handleSeeDetail = (e) => {
      e.preventDefault();
      localStorage.setItem(props.doc_id, JSON.stringify(props))
      navigate(`/detail/${props.doc_id}`)
    }

    useEffect(() => {
        localStorage.removeItem(props.doc_id)
    }, [props.doc_id])
    return (

        <div className={`card ${props.top ? ' shadow' : ''}`}>
            <div className="card__header">
                <div className="card__span">
                    <span id={`${props.doc_id}-score`}>Score: {props.score}</span>
                </div>
                <hr />
                <div className="card__title">
                    {props.top ? <h5>Top Result</h5> : <></>}
                    <Link to={'/'} onClick={(e) => handleSeeDetail(e)}>
                      {props.top ?  `${props.doc_id}` : `Document with ID: ${props.doc_id}`}
                    </Link>
                </div>
            </div>

            <div className="card__content">
                {props.top ? <p>{props.content}</p> : <p>{trimText(props.content)}</p>}
            </div>
        </div>

    )
}

export default SearchResult