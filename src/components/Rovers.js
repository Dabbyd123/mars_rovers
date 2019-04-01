import React from 'react';

const Rovers = (props) => {
    return (
        <div className="rovers">
            <button type="button" onClick={props.clickHandler} id="Curiosity" className="rover Curiosity">
                <h1>Curiosity</h1>
            </button>
            <button type="button" onClick={props.clickHandler} id="Opportunity" className="rover Opportunity">
                <h1>Opportunity</h1>
            </button>
            <button type="button" onClick={props.clickHandler} id="Spirit" className="rover Spirit">
                <h1>Spirit</h1>
            </button>
        </div>
    )
}

export default Rovers;