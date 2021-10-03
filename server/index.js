const db = require("./config/db/index");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const vaccineRouter = require("./routes/vaccine");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/user");
const healthOrganizationRouter = require("./routes/healthOganization");
const organizationRouter = require("./routes/company");
const provinceRouter = require("./routes/province");
const districtRouter = require("./routes/district");
const wardRouter = require("./routes/ward");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

db.connectDB();
//routes

app.use("/api/auth", authRouter);
app.use("/api/vaccine", vaccineRouter);
app.use("/api/role", roleRouter);
app.use("/api/user", userRouter);
app.use("/api/organization", healthOrganizationRouter);
app.use("/api/company", organizationRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
