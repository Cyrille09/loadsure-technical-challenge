import "dotenv/config";
import express from "express";
import { calculateTotalSequences } from "./knightMoves";

const app = express();

const knightMoves = calculateTotalSequences();

// Output the knightMoves result.
console.log("Total number of valid 10-key sequences:", knightMoves);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server listening on ${process.env.host}:${PORT}`);
});
