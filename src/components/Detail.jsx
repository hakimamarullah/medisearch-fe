import React from 'react'
import { useParams } from 'react-router-dom'
import Highlighter from 'react-highlight-words'

const Detail = () => {
    const { doc_id } = useParams()
    const { score, content } = JSON.parse(sessionStorage.getItem(doc_id))
    const query = sessionStorage.getItem('q')
    return (
        <div className='detail'>
            <div className="detail__header">
                <div className="detail__title">
                    <h1>Medical Document</h1>
                    <h2>{doc_id}</h2>
                </div>
                <hr />
                <div className="detail__span">
                    <span>Score: {score}</span>
                </div>
            </div>

            <div className="detail__content">
                <Highlighter
                    highlightClassName='highlight-word'
                    className='hai'
                    autoEscape={true}
                    searchWords={query.split(/\s/).filter(word => word)}
                    textToHighlight={content}
                />
            </div>
        </div>
    )
}

export default Detail