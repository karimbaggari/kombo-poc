import { komboService } from '../../../../../../backend/kombo.service';


export async function POST(req: Request) {
  const body = await req.json();
  console.log('initiate-connection endpoint called', body);
  try {
    const userDetails = {
      email: 'karim@jobzyn.com',
      companyName: 'Jobzyn',
      redirectUri: 'https://ded6-105-68-221-42.ngrok-free.app/api/kombo/auth/callback',
    };
    const link = await komboService.createConnectionLink(userDetails);
    console.log('link here', link);
    return Response.json({ link });
  } catch (error) {
    console.error('Error creating connection link:', error);
    return Response.json(
      { error: 'Failed to create connection link' }, 
      { status: 500 }
    );
  }
} 