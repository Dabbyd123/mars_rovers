import React from 'react';

const Rovers = (props) => {
    return (
        <div className="rovers">
            <div type="button" onClick={props.clickHandler} id="Curiosity" className="rover Curiosity">
                Curiosity
            </div>
            <div type="button" onClick={props.clickHandler} id="Opportunity" className="rover Opportunity">
                Opportunity
            </div>
            <div type="button" onClick={props.clickHandler} id="Spirit" className="rover Spirit">
                Spirit
            </div>
        </div>
    )
}

export default Rovers;