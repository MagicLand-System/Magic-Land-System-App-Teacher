import React, { createContext, useEffect, useState } from 'react';
import { getRealTime } from '../api/auth';

// Create the UserContext
export const TimeContext = createContext();

// Create the UserProvider component
export const TimePovider = ({ children }) => {
    const [time, setTime] = useState(new Date);

    useEffect(() => {
        reloadTime()

        const intervalId = setInterval(() => {
            reloadTime()
        }, 60000);

        return () => clearInterval(intervalId);
    }, [])

    const updateTime = (time) => {
        setTime(time);
    };

    const reloadTime = async () => {
        const response = await getRealTime()
        console.log("reload Time ", response);
        if (response) {
            setTime(response);
        }
    }

    return (
        <TimeContext.Provider value={{ time, updateTime, reloadTime }}>
            {children}
        </TimeContext.Provider>
    );
};