import dotenv from 'dotenv';
import getToken from './authorization/authorizationAzure.js';
import axios from 'axios';

dotenv.config()



const GestionSharePoint= {

    Prueba: async(req, res)=>{
        try {
            console.log("Hola")
            const token = await getToken()
            console.log(token)
            return res.send("Me llamaste 👀")

        } catch (error) {
            console.error("Error ", error);
            res.status(500).json({
              error: "Error"
            });
        }
    },

    listarArchivos: async (req, res) => {
        try {
            const token = await getToken();
            const SH_sitio = process.env.SHAREPOINT_SITIO
            const SH_libreria = process.env.SHAREPOINT_LIBRARY
            const response = await axios.get(`${SH_sitio}/_api/web/GetFolderByServerRelativeUrl('${SH_libreria}')/Files`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json;odata=verbose',
                },
            });

            const files = response.data.d.results.map(file => ({
                name: file.Name,
                link: file.LinkingUri || file.ServerRelativeUrl,
            }));

            res.status(200).json(files);
        } catch (error) {
            console.error('Error retrieving files:', error);
            res.status(500).json({
              error: "Error retrieving files",
              details: error.message
            });
        }
    },

};
export default GestionSharePoint;