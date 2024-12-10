const express = require("express");
const mongoose = require("mongoose");
const { ServerConfig } = require("./config");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect(ServerConfig.DB);
}

app.listen(ServerConfig.PORT, async () => {
  console.log(`course Server is listening to the port ${ServerConfig.PORT}`);
});
