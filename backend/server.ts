import express from "express";
import { gamesRoute } from "./routes/gamesRoute.ts";
import { usersRoute } from "./routes/usersRoute.ts";
import { gamesStatsRoute } from "./routes/gamesStatsRoute.ts";

const app = express();
const PORT = 1338;

app.use(express.json());

app.use("/users", usersRoute);
app.use("/games", gamesRoute);
app.use("/gamestats", gamesStatsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
