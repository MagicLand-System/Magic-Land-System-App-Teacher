import React, { createContext, useEffect, useState } from 'react';
import { getAllNotification } from '../api/notification';
import { userSelector } from '../store/selector';
import { useSelector } from 'react-redux';

// Create the UserContext
export const NotificateContext = createContext();

// Create the UserProvider component
export const NotificatePovider = ({ children }) => {
    const user = useSelector(userSelector);
    const [notificate, setNotificate] = useState(new Date);

    useEffect(() => {
        reloadNotificate()

        const intervalId = setInterval(() => {
            reloadNotificate()
        }, 60000);

        return () => clearInterval(intervalId);
    }, [])

    const updateNotificate = (notificate) => {
        setNotificate(notificate);
    };

    const reloadNotificate = async () => {
        const response = await getAllNotification()
        console.log("reload Notificate ");
        if (response?.status === 200) {
            setNotificate(response?.data);
        } else {
            setNotificate([]);
        }
    }

    return (
        <NotificateContext.Provider value={{ notificate, updateNotificate, reloadNotificate }}>
            {children}
        </NotificateContext.Provider>
    );
};