import React from 'react'
import Loader from 'react-loader-spinner'
import FileDrop from './FileDrop';
import { READY } from '../constants'
import '../css/FilePanel.css'

export default ({ loading, onProcessStateChange }) => (
    <div className="file-panel">
        { loading === READY ?
            <FileDrop 
                onProcessStateChange={onProcessStateChange}
            />
        : 
            <Loader
                type="Circles"
                color="#8A2BE2"
                height={100}
                width={100}
                timeout={60000}
            />
        }
    </div>
)
