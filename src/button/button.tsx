import * as React from 'react';

const buttonStyle = {
    border: '1px solid #0065FF',
    borderRadius: '3px',
    backgroundColor: '#0065FF',
    cursor: 'pointer',
    fontSize: '15px',
    padding: '5px 10px',
    margin: '10px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: 'white',
    fontWeight: 600
};

export const Button: React.FunctionComponent= ({children}) => {
    return <button style={buttonStyle}>{children}</button>
};