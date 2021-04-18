import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";
import priceRoutes from "./routes/priceRoutes.js";
import cron from "node-cron";
import axios from "axios";
import fs from "fs";

dotenv.config();
const app = express();

const writeData = (data) => {
  fs.writeFile("./data/price.json", data, () => {
    console.log("file written");
  });
};

cron.schedule("*/8 * * * *", function () {
  axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=bitcoin,ethereum,litecoin,tether,xrp,cardano,bitcoin-cash,stellar,chainlink,monero&aux=total_supply",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "801f6b48-1c04-4af7-8518-29d7dc2d2082",
        },
      }
    )
    .then(function (response) {
      let data = response.data;
      writeData(JSON.stringify(data));
    })
    .catch((e) => console.log(e));
});

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "../frontend")));
app.use(express.static(path.join(process.cwd(), "../client/build")));
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/prices", priceRoutes);
app.use(errorHandler);
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../client/build/index.html"));
});

// app.get("/", function (req, res) {
//   res.sendFile(process.cwd() + "/public/index.html");
// });

connectDB();

app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
