import React from 'react';

const Rovers = (props) => {
    return (
        <div className="rovers">
            <div type="button" onClick={props.clickHandler} id="Curiosity" className="rover Curiosity">
                <h1>Curiosity</h1>
            </div>
            <div type="button" onClick={props.clickHandler} id="Opportunity" className="rover Opportunity">
                <h1>Opportunity</h1>
            </div>
            <div type="button" onClick={props.clickHandler} id="Spirit" className="rover Spirit">
                <h1>Spirit</h1>
            </div>
        </div>
    )
}

export default Rovers;