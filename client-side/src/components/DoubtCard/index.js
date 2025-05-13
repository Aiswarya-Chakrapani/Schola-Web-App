import React, { useState } from 'react';
import './index.css';

const DoubtCard = (props) => {
    const { doubt, addDoubtToStateFunc } = props;
    const {
        doubt_description,
        doubt_img_url,
        doubt_id,
        isSolved,
        doubt_solution_url,
        doubt_solution_description,
        doubt_solved_by
    } = doubt;

    // State to track if the Reply button has been clicked
    const [isReplying, setIsReplying] = useState(false);

    // Function to handle Reply button click
    const funcAddDoubtIdToState = () => {
        addDoubtToStateFunc(doubt_id);
        setIsReplying(true); // Set reply status to true when clicked
    };

    return (
        <div style={{ borderStyle: 'solid', margin: '20px', padding: '10px', backgroundColor: isReplying ? '#f0f8ff' : 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={doubt_img_url}
                    alt="doubt"
                    style={{ height: '200px', width: '200px', marginRight: '20px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p className="p-edit" style={{ fontFamily: '"Roboto Mono", system-ui' }}>
                        {doubt_description}
                    </p>
                    <button
                        className="reply-btn"
                        onClick={funcAddDoubtIdToState}
                        style={{ backgroundColor: isReplying ? 'green' : 'blue', color: 'white' }}
                    >
                        {isReplying ? 'Replying...' : 'Reply'}
                    </button>
                </div>
            </div>
            {isSolved === 'true' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '25px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p
                            style={{ fontFamily: '"Roboto Mono", system-ui' }}
                            className="p-edit p-edit-solution"
                        >
                            {doubt_solution_description}
                        </p>
                        <p className="p-edit">Solved By: {doubt_solved_by}</p>
                    </div>
                    <img
                        src={doubt_solution_url}
                        alt="solution"
                        style={{ height: '200px', width: '200px', marginRight: '20px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default DoubtCard;
