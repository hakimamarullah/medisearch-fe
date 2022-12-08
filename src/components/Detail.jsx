import React from 'react'
import { useParams } from 'react-router-dom'

const Detail = () => {
    const { doc_id } = useParams()
    const { score, content } = JSON.parse(localStorage.getItem(doc_id))
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
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Detail