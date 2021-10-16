const authRouter = require("./auth");
const organizationRouter = require("./company");
const userRouter = require("./user");
const healthOrganizationRouter = require("./healthOganization");
const userInjectionRegisterRouter = require("./userInjectionRegister");
const organInjectionRegisterRouter = require("./organInjectionRegister");
const scheduleInjectionRouter = require("./scheduleInjection");
const injectionInforRouter = require("./injection_infor");
const roleRouter = require("./role");
const vaccineRouter = require("./vaccine");
const diseaseRouter = require("./disease");

const routes = {
  authRouter,
  organizationRouter,
  userRouter,
  healthOrganizationRouter,
  userInjectionRegisterRouter,
  organInjectionRegisterRouter,
  scheduleInjectionRouter,
  injectionInforRouter,
  roleRouter,
  vaccineRouter,
  diseaseRouter,
};

module.exports = routes;
