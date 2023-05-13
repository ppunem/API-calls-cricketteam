const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "cricketTeam.db");
app.use(express.json())
const app = express();

const initializeDBAndServer = async () => {
    let db=null;
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, (request, reaponse) => {
      console.log("server and database initialized successfully");
    });
  } catch (e) {
    console.log(`ERROR:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/players/", async () => {
  const playersQuery = `SELECT * FROM cricket_team`;
  const playersDetails = await db.all(playersQuery);
  response.send(playersDetails);
});

app.post("/players/",async(request,response)=>{
    const addPlayer=request.body
    const{playerName,jerseyNumber,role}=addPlayer
    const addPlayerQuery=`INSERT INTO cricket_team(playerName,jerseyNumber,role) 
    VALUES(`${playerName}`,`${jerseyNumber}`,`${role}`)`

    const dbResponse=await db.run(addPlayerQuery)
    const playerId=dbResponse.lastID
    response.send({playerId:playerId})
})

app.get("/players/:playerId/",async(request,response)=>{
    const {playerId}=request.params
    const getPlayerQuery=`SELECT * FROM cricket_team WHERE player_id=${playerId}`

    const player=await db.get(getPlayerQuery)
    response.send(player)
})

