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

// app.use(
//   cors({
//     origin: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-dat",
//     credentials: true,
//   })
// );
app.use(morgan("dev"));
app.use(cookieParser());

// // SET STORAGE
// const upload = multer({ dest: "./public/data/uploads/" });

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

db.connectDB();
//routes

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
