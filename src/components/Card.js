import React from 'react';

const Card = (props) => {
    return (
        <div
            className="card"
        >
            <img
                src={props.image}
                alt=""
                id={props.id}
                onClick={props.click}
                className="image">
            </img>
        </div>
    )
}

export default Card;