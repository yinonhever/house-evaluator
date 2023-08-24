import express from "express";
import cors from "cors";

import houseRoutes from "./routes/houses";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/houses", houseRoutes);

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
