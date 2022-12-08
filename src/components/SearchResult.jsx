import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchResult = (props) => {
    const [fullText, setFullText] = useState(props.content);
    const trimText = (text) => {
        if (text.length > 200) {
            return text.substring(0, 200).trimEnd() + " ..."
        }
        else {
            return text
        }
    }
    const handleSeeDetail = (e) => {
      
    }

    return (

        <div className={`card ${props.top ? ' shadow' : ''}`}>
            <div className="card__header">
                <div className="card__span">
                    <span>Score: {props.score}</span>
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