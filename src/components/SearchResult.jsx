import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = (props) => {
    const trimText = (text) => {
        if (text.length > 200) {
            return text.substring(0, 200).trimEnd() + " ..."
        }
        else {
            return text
        }
    }

    return (

        <div className="card">
            <div className="card__header">
                <div className="card__span">
                    <span>Score: {props.score}</span>
                </div>
                <hr />
                <div className="card__title">
                    <Link style={{ textDecoration: 'none', color: 'rgb(121, 92, 178)' }} to={'/'}>
                        Document with ID: {props.doc_id}
                    </Link>
                </div>
            </div>

            <div className="card__content">
                <p>{trimText(props.content)}</p>
            </div>
        </div>

    )
}

export default SearchResult