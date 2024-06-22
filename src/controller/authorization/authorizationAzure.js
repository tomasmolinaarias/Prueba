import dotenv from 'dotenv';
import { ConfidentialClientApplication } from '@azure/msal-node';

dotenv.config();

const config = {
    auth: {
        clientId: process.env.clientId,
        authority: `https://login.microsoftonline.com/${process.env.IdInquilino}`,
        clientSecret: process.env.ClientSecret,
    }
};

const cca = new ConfidentialClientApplication(config);

async function getToken() {
    const clientCredentialRequest = {
        scopes: ['https://graph.microsoft.com/.default'],
    };

    try {
        const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);
        console.log(response.accessToken);
        return response.accessToken;
    } catch (error) {
        console.error('Error acquiring token:', JSON.stringify(error));
        throw error;
    }
}

export default getToken;