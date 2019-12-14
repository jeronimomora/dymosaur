import React from 'react';
import AlertTemplate from 'react-alert-template-basic-with-icons'

const alertStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    fontFamily: 'Arial',
    width: '400px',
    boxSizing: 'border-box'
}

export default (props) => (
    <AlertTemplate 
        iconColors={{ close: 'black' }} 
        alertStyle={alertStyle}
        {...props} 
    />
)