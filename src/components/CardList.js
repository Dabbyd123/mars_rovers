import React from 'react';
import Card from './Card';


const CardList = (props) => {
    return (
        <div className="card_list">
            {props.photos.map((img, i) => {
                return (
                    <Card
                        id={i}
                        key={i}
                        image={img.image}
                        className="card"
                    />
                );
            })}
        </div>
    )
}

export default CardList;