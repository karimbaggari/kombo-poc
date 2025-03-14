'use client';
import React, { useState } from 'react';
import { showKomboConnect } from '@kombo-api/connect';

const KomboConnectButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/kombo/auth/initiate-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user-123',
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      // Check if response has content before parsing
      const text = await response.text();
      if (!text) {
        throw new Error('Empty response received from server');
      }

      const data = JSON.parse(text);

      if (!data.link) {
        throw new Error('No connection link received from server');
      }

      showKomboConnect(data.link);
    } catch (error) {
      console.error('Error initiating Kombo Connect:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleConnect}
        disabled={isLoading}
      >
        {isLoading ? 'Connecting...' : 'Connect with Kombo'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default KomboConnectButton;