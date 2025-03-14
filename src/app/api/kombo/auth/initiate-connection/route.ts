import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    
    const response = await axios.post(
      'https://api.kombo.dev/v1/connect/create-link',
      {
        end_user_email: 'karim@jobzyn.com', // Replace with actual user email
        end_user_organization_name: 'Jobzyn', // Replace with actual org name
        end_user_origin_id: userId,
        integration_category: 'ATS', // Or 'ATS' or 'ASSESSMENT'
      },
      {
        headers: {
          authorization: `Bearer ${process.env.KOMBO_API_KEY}`,
        },
      }
    );

    console.log('response', response);

    return NextResponse.json({ link: response.data.data.link });
  } catch (error) {
    console.error('Error in Kombo connection API:', error);
    return NextResponse.json(
      { error: 'Failed to initiate connection' },
      { status: 500 }
    );
  }
}