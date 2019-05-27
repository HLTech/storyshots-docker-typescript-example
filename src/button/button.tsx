import * as React from 'react';

const buttonStyle = {
    border: '1px solid rgb(225, 225, 225)',
    borderRadius: '5px',
    backgroundColor: 'rgb(238, 238, 238)',
    cursor: 'pointer',
    fontSize: '15px',
    padding: '5px 10px',
    margin: '10px',
    fontFamily: 'Helvetica, Arial, sans-serif'
};

export const Button: React.FunctionComponent= ({children}) => {
    return <button style={buttonStyle}>{children}</button>
};