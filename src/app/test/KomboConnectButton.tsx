"use client"
import { useState } from 'react';


export default function KomboConnectButton() {
  const [isLoading, setIsLoading] = useState(false);

  const initiateConnection = async () => {
    setIsLoading(true);
    try {
        const redirectUri = process.env.KOMBO_REDIRECT_URI || 'https://ded6-105-68-221-42.ngrok-free.app';
      const response = await fetch('/api/kombo/auth/initiate-connection', {
        method: 'POST',
        body: JSON.stringify({
          email: 'karim@jobzyn.com', // Replace with actual user email
          companyName: 'Jobzyn', // Replace with actual company name
          userId: Date.now().toString(), // Add a unique user identifier
          redirectUri: redirectUri
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.link) {
        window.location.href = data.link;
      }
    } catch (error) {
      console.error('Failed to initiate Kombo connection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={initiateConnection} disabled={isLoading}>
      {isLoading ? 'Connecting...' : 'Connect ATS'}
    </button>
  );
}