// src/context/SoundCloudContext.tsx
import React, { createContext, useState, useEffect } from 'react';

const CLIENT_ID = "CcuNTbKkAMIPLedGcyTw430ppDRwSZ3n"; // Replace with your SoundCloud Client ID
const CLIENT_SECRET = "P3EBzF7Bw8CuSTqG0zw4pIdJaMTbbEn2"; // Replace with your SoundCloud Client Secret

export const SoundCloudContext = createContext({
    accessToken: null,
    isRateLimited: false,
    fetchToken: async () => { },
});

export const SoundCloudProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isRateLimited, setIsRateLimited] = useState(false);

    const fetchToken = async () => {
        // Check cached token
        const cachedToken = localStorage.getItem('soundcloud_access_token');
        const cachedExpiry = localStorage.getItem('soundcloud_token_expiry');
        const now = Date.now();

        if (cachedToken && cachedExpiry && now < parseInt(cachedExpiry)) {
            setAccessToken(cachedToken);
            return;
        }

        try {
            const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
            const response = await fetch("https://secure.soundcloud.com/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${credentials}`,
                    Accept: "application/json; charset=utf-8",
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                }),
            });

            if (response.status === 429) {
                setIsRateLimited(true);
                console.error("Rate limit exceeded. Try again later.");
                return;
            }

            const data = await response.json();
            if (data.access_token) {
                setAccessToken(data.access_token);
                setIsRateLimited(false);
                localStorage.setItem("soundcloud_access_token", data.access_token);
                localStorage.setItem(
                    "soundcloud_token_expiry",
                    (now + data.expires_in * 1000).toString()
                );
            } else {
                console.error("No access token in response:", data);
            }
        } catch (error) {
            console.error("Error fetching token:", error.message);
        }
    };

    useEffect(() => {
        fetchToken();
    }, []);

    return (
        <SoundCloudContext.Provider value={{ accessToken, isRateLimited, fetchToken }}>
            {children}
        </SoundCloudContext.Provider>
    );
};