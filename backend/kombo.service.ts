import axios from "axios";

class KomboService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.KOMBO_API_KEY || "";
    this.baseUrl = "https://api.kombo.dev/v1";
  }

  async createConnectionLink(userDetails: { email: string; companyName: string, redirectUri: string }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/connect/create-link`,
        {
          end_user_email: userDetails.email,
          end_user_organization_name: userDetails.companyName,
          integration_category: "ATS",
          integration_tool: "teamtailor",
          unique_id: Date.now().toString(),
          redirect_uri: userDetails.redirectUri,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data.link;
    } catch (error) {
      console.error("Error creating connection link:", error);
      throw error;
    }
  }


  async handleIntegrationCreatedWebhook(payload: any) {
    console.log("New integration created:", payload);

    const integrationId = payload.data.id;
    const tool = payload.data.tool;
    const category = payload.data.category;
    const endUser = payload.data.end_user;

    console.log(`New ${category} integration created for ${tool}`);
    console.log(`Integration ID: ${integrationId}`);
    console.log(`End user: ${endUser.organization_name} (${endUser.creator_email})`);

    return true;
  }

  async activateIntegration(token: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/connect/activate-integration`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error activating integration:", error);
      throw error;
    }
  }
}

export const komboService = new KomboService();
