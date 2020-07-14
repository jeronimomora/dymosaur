import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAlert } from 'react-alert';
import { useOnDrop } from './logic';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: '2px dashed #ccc',
    outlineOffset: '-4px',
    margin: '1px',
};

const activeStyle = {
    outlineColor: '#2196f3',
};

const acceptStyle = {
    outlineColor: '#00e676',
};

const rejectStyle = {
    outlineColor: '#ff1744',
};

export default ({ onProcessStateChange }) => {
    const alert = useAlert();

    const onDrop = useOnDrop(alert, onProcessStateChange);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ accept: 'application/pdf', multiple: false, onDrop });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragAccept, isDragActive, isDragReject],
    );

    return (
        <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop your pdf or click here</p>
        </div>
    );
};
