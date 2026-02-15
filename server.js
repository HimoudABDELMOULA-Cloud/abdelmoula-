const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { TableClient } = require("@azure/data-tables");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Azure Storage connection string in App Service Configuration
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const tableName = "Messages";

if (!connectionString) {
  console.error("❌ AZURE_STORAGE_CONNECTION_STRING is missing!");
}

const tableClient = connectionString
  ? TableClient.fromConnectionString(connectionString, tableName)
  : null;

async function createTableIfNotExists() {
  if (!tableClient) return;
  try {
    await tableClient.createTable();
    console.log("✅ Table created!");
  } catch (err) {
    console.log("ℹ️ Table already exists or error:", err.message);
  }
}

createTableIfNotExists();

app.use(express.static(__dirname));

app.post("/api/contact", async (req, res) => {
  try {
    if (!tableClient) {
      return res.status(500).json({
        success: false,
        msg: "Storage connection string missing in Azure App Service configuration ❌"
      });
    }

    const { name, email, message } = req.body;

    const entity = {
      partitionKey: "contact",
      rowKey: Date.now().toString(),
      name: name,
      email: email,
      message: message
    };

    await tableClient.createEntity(entity);

    res.json({ success: true, msg: "Message enregistré avec succès ✅" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Erreur serveur ❌" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
