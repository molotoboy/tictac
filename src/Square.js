import React from 'react'
export function Square(props) {
    return (
        <button
            className={props.activeSquare ? 'square active' : 'square'}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}
