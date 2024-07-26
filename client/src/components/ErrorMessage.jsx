import { useState } from 'react';
import '../styles/NotificationMessage.css';

export const removeMsg = (setMsg, setIsError) => {
    setMsg('');
    setIsError(false);
}

const NotificationMessage = ({message, isError}) => {
    const [msg, setMsg] = useState(message);
    return( 
        <>
        {
            msg.length > 0 ?
            <div id={ isError ? 'errorDisplay' : 'notificationDisplay'}>
                {msg}
            </div>
            : 
         <></>
        }
        </>
    )
}

export default NotificationMessage;