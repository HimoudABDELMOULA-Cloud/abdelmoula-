# NovaTech - Azure App Service Project

Site web d'entreprise + page admin + API Node.js pour enregistrer les messages de contact dans Azure Table Storage.

## Login Admin (Demo)
- username: admin
- password: 1234

## Run locally
```bash
npm install
npm start
```

Then open: http://localhost:3000

## Deploy on Azure App Service
1. Create Web App (Node.js runtime)
2. Add environment variable:
   AZURE_STORAGE_CONNECTION_STRING = <your storage connection string>
3. Deploy with GitHub Actions

## Azure Storage Table
Table name: Messages
