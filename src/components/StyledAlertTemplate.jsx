import React from 'react';
import AlertTemplate from 'react-alert-template-basic-with-icons'

const styleOverrides = {
    backgroundColor: 'white',
    color: 'black',
    width: '450px'
}

export default (props) => (
    <AlertTemplate
        {...props}
        iconColors={{ close: 'black' }} 
        style={{ ...props.style, ...styleOverrides }}
    />
)