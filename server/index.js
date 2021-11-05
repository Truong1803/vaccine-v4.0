const db = require("./config/db/index");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// const multer = require("multer");

const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: `${process.env.BASE_URL}`,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://vaccination-truong1803.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
db.connectDB();
//routes

app.use("/api/auth", routes.authRouter);
app.use("/api/vaccine", routes.vaccineRouter);
app.use("/api/role", routes.roleRouter);
app.use("/api/user", routes.userRouter);

app.use("/api/health-organization", routes.healthOrganizationRouter);
app.use("/api/organization", routes.organizationRouter);
app.use("/api/disease", routes.diseaseRouter);
app.use("/api/side-effect", routes.sideEffectRouter);

app.use("/api/organ-injection-register", routes.organInjectionRegisterRouter);
app.use("/api/user-injection-register", routes.userInjectionRegisterRouter);
app.use("/api/schedule-injection", routes.scheduleInjectionRouter);
app.use("/api/injection-infor", routes.injectionInforRouter);

app.use("/api/report", routes.reportRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
