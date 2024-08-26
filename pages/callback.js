import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            exchangeCodeForToken(code);
        }
    });

    const exchangeCodeForToken = (code) => {
        fetch('http://localhost:3001/spotify/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        })
        .then(response => response.json())
        .then(() => {
            navigate('/'); 
        })
        .catch(error => {
            console.error('Error during token exchange:', error);
        });
    };

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
};

export default CallbackScreen;
