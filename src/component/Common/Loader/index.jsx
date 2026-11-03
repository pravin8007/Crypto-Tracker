import React from 'react';
import "./styles.css"
import { CircularProgress } from '@mui/material';

const Loader = ({ inline = false }) => {
    return (
        <div className={`loader-container${inline ? " loader-inline" : ""}`}>
           <CircularProgress />
        </div>
    );
};

export default Loader;