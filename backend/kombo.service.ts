import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const KOMBO_API_KEY = process.env.KOMBO_API_KEY;
const REDIRECT_URL = 'https://your-app.com/kombo-callback';

app.post('/api/create-connection-link', async (req, res) => {
  try {
    const response = await fetch('https://api.kombo.dev/v1/connect/create-link', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KOMBO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        end_user: { origin_id: req.body.userId },
        redirect_url: REDIRECT_URL,
      }),
    });
    const data = await response.json() as { link: string };


    res.json({ link: data.link });
  } catch (error) {
    console.error('Error creating connection link:', error);
    res.status(500).json({ error: 'Failed to create connection link' });
  }
});

app.get('/kombo-callback', (req, res) => {
  // Handle the redirect back from Kombo
  // You might want to check for success/failure parameters here
  res.send("Connection process completed!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});