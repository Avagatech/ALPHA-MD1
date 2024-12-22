const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID |eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUZId0tWdlJDaGRvMUoyZ1N6RTk1Q08wWDlvbzYxbmRxOUhwV2c4WGJXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVBPNVMwUktLakwybVJob2J5d1RzK0tqclRZWHJEMzNReEpad3JYQmZraz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSGRNT0F1QjJJOW13cEgvcHVFbzFPdmtocVB3Y0ZuK2hhQng3ek54ODE0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZalNjSG85cW82eHdxOWhwNTE0N2tpN2Q5NHdUY1EvYnN1RTVqUjRKY1ZzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndFVXR4YmwxU2o5NU9NSlJqc1pIRWxZTFk5S0dYYU92dEtSQzJJTGlOM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhBMjlzN2FFZlBLTVY3OFlqdG1vd0xybVhLM3dhZ2hGdHkwZjNxd1psRWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVAxd295bmx0d3lZQk96YXU3UTc2NEsyeWdHajdmL1c1TEdzYVlBRVBtYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjZuRXgrS29HeDMvelk1VWI0QW1WZDFYazdnWGRUa0pkR3pFK2YyVHpFRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFIV0JNdk5CdDBpT2pDS2NkbXY3Z2k5a3daNjJXMkNMeU9HRzNGaktnZ0wwYkJ3SGgwa0N3NVE5eHBqdEoyYVFUUDA0MjZCL0U2MHAvSk9qaThsS0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc0LCJhZHZTZWNyZXRLZXkiOiI1QVlTaHROT2ltaUdPWjl1RzVNYURVZUozYjd6ekhPWTc5bFFieGVQL05vPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJaZWt5SFplMVJVLXQyaGhtM0JSR3ZBIiwicGhvbmVJZCI6IjllMjdlODY3LTk1NjctNDQ5My04OGVmLTljMDExZmEyZTlmMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRmc3b2NjcmIvYktlWkJJOEVZYWhUaUYxdWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWlhFMzV1N0VLVzFLR21CaXd0MjNSalVJazJvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlE5WDg3S0MxIiwibWUiOnsiaWQiOiIyNTY3ODc5MTg5MDQ6OTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQnVzYWd3YSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1hQMzR3QkVPblRvTHNHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMWlpMDl1SmlUUjRLWXYxM094bkM3OVJTaVJsZmtwQXh4U3IrNFNWamVSMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRlZPVkppblRwcFMyVjhHdlB3KzlPTWhqaDJlbG0rT0Vzd0tQdmNZKzR5UTZSV3ArQkhSMGpPOEJPczFMUy9RVnJUV3FDZURPYms5MnVHTUM4U041Q3c9PSIsImRldmljZVNpZ25hdHVyZSI6IjZvQXhGTXVWell6ZjZnc2pMYVU3NUJUL1Z6ZjNoUGxNTnN4SXlmdUtmOTMwTUYzZkU4UGRoVUViNTN0b2ZjU0V2OUd3aGJNdm1qQUJ1bEdXOXB0UUJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2Nzg3OTE4OTA0OjkyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRZb3RQYmlZazBlQ21MOWR6c1p3dS9VVW9rWlg1S1FNY1VxL3VFbFkza2QifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQ4Nzk3MzZ9| 'keith',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "Keith",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254748387615",  
    ANTILINK : process.env.ANTILINK || "yes",
    ANTI_VV : process.env.ANTI_VV || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
