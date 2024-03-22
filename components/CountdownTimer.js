import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const CountdownTimer = ({ timer, setTimer, color, fontsize }) => {

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timer]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return <Text style={{ color, fontSize: fontsize }}>{formatTime(timer)}</Text>;
};

export default CountdownTimer;
