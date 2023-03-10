import React from 'react';
import {INotification} from "@/utils";
import {Alert, Snackbar} from "@mui/material";

interface INotificationProps {
    notification: INotification;
    onClose: () => void;
}

const Notification: React.FC<INotificationProps> = ({notification, onClose}) => {
    return <>
        {notification.status && notification.message &&
            <Snackbar open={notification.open}
                      autoHideDuration={3000}
                      onClose={onClose}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                      }}>
                <Alert onClose={onClose}
                       severity={notification.status}>
                    {notification.message}
                </Alert>
            </Snackbar>}

    </>;
};

export default Notification;