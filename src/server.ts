import express from "express";
import "dotenv/config";
import { setupDatabase } from "./database";
import { urlRouter } from "./routes/url-routes";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

const corsAllowedOrigins = ["http://localhost:3000"];
const corsConfig = {
  origin: corsAllowedOrigins,
  methods: "GET,POST",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsConfig));
app.use(helmet());
app.use(urlRouter);

const startServer = async () => {
  await setupDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
};

startServer();
