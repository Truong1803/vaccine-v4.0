const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../../model/user");
const Organization = require("../../model/organization");

const sms = require("../../config/sendSMS");

const valid = require("../../middleware/valid");
const sendEmail = require("../../config/sendEmail");
const healthOrganization = require("../../model/healthOrganization");

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  /**
   *
   * @param {*} phonenumber
   * @param {*} identification
   * @returns {phonenumber,identification}
   */
  async registerSms(req, res) {
    const { phonenumber, identification } = req.body;
    if (!valid.validPhone(phonenumber))
      return res.status(400).json({ msg: "phone number format is incorrect." });
    try {
      const user = await Users.findOne({ phonenumber, identification });
      if (user) return res.status(401).json({ msg: "User already exists" });

      const data = await sms.smsOTP(phonenumber, "sms");

      res.json({
        data,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   *
   * @param email,
   * @param  password,
   * @param  organization,
   * @param  represent,
   * @param  phonenumber,
   * @param  province,
   * @param  district,
   * @param  ward,
   * @param  address,
   * @returns message
   */
  registerOrgan: async (req, res) => {
    const {
      email,
      password,
      organization,
      represent,
      phonenumber,
      province,
      district,
      ward,
      address,
    } = req.body;
    try {
      if (!valid.validateEmail(email))
        return res.status(400).json({ msg: "Email incorrect format" });
      const user = await Organization.findOne({ email });
      if (user) return res.status(400).json({ msg: "Email  already exists." });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        password: passwordHash,
        organization,
        represent,
        phonenumber,
        province,
        district,
        ward,
        address,
      };

      const active_token = createActiveToken({ newUser });

      const url = `${CLIENT_URL}/auth/${active_token}`;
      sendEmail(email, url, "Verify your email address.");

      return res.json({ msg: "Success! Please check your email." });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   *
   * @param {*} active_token
   * @returns {message,user,access_token}
   */
  activeAccount: async (req, res) => {
    try {
      const { active_token } = req.body;
      const decoded = jwt.verify(
        active_token,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      );
      const { newUser } = decoded;

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication." });

      const user = await Organization.findOne({ email: newUser.email });
      if (user) return res.status(400).json({ msg: "Account already exists." });

      const new_user = new Organization(newUser);

      await new_user.save();
      sendToken(new_user, res, "Account has been activated!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /**
   *
   * @param {*} phonenumber
   * @param {*} code
   * @returns {message}
   */
  async verifyOTP(req, res) {
    try {
      const { phonenumber, code } = req.body;

      const data = await sms.smsVerify(phonenumber, code);

      if (!data?.valid)
        return res.status(400).json({ msg: "Invalid Authentication" });

      const user = await Users.findOne({ phonenumber });

      if (user) sendToken(user, res, "Login Success");
      else {
        // const status = { wait: "pending" };
        return res.json({
          msg: "Verify Success",
          data: "pending",
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   *
   * @param {*}  phonenumber,
   * @param {*}   identification,
   * @param {*}   name,
   * @param {*}   gender,
   * @param {*}    dob,
   * @param {*}    province,
   * @param {*}   district,
   * @param {*}  ward,
   * @param {*}   address,
   * @returns {message,user,access_token}
   */
  updateInfor: async (req, res) => {
    const {
      phonenumber,
      identification,
      name,
      gender,
      dob,
      province,
      district,
      ward,
      address,
    } = req.body;
    try {
      const newUser = new Users({
        phonenumber,
        identification,
        name,
        gender,
        dob,
        province,
        district,
        ward,
        address,
      });
      await newUser.save();

      sendToken(newUser, res, "Register Success");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   *
   * @param {*} phonenumber
   * @returns {message}
   */
  loginSms: async (req, res) => {
    try {
      const { phonenumber } = req.body;
      const user = await Users.findOne({ phonenumber });
      if (!user)
        return res.status(400).json({ msg: "This account does not exits." });
      const data = await sms.smsOTP(phonenumber, "sms");
      res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   *
   * @param {*} email
   * @param {*} password
   * @returns {message, user, access_token}
   */
  loginOrgan: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Organization.findOne({ email });
      if (!user) {
        const organ = await healthOrganization.findOne({ email });
        if (!organ) {
          return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, organ.password);

        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect" });
        sendToken(organ, res, "Loggin success");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect" });
      sendToken(user, res, "Loggin success");
    } catch (error) {}
  },
  // async register_email
  /**
   *
   * @param {*} access_token
   * @returns {user,access_token}
   */
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });
      const decoded = jwt.verify(
        rf_token,
        `${process.env.REFRESH_TOKEN_SECRET}`
      );
      if (!decoded.id)
        return res.status(400).json({ msg: "Please login now!" });
      const user = await Users.findById(decoded.id).select("-password");
      const userOther = await Organization.findById(decoded.id).select(
        "-password"
      );
      const health = await healthOrganization
        .findById(decoded.id)
        .select("-password");
      if (!user && !userOther && !health)
        return res.status(400).json({ msg: "This account does not exist." });
      if (user) {
        const access_token = createAccessToken({ id: user._id });
        res.json({ access_token, user });
      } else if (userOther) {
        const access_token = createAccessToken({ id: userOther._id });
        res.json({ access_token, user: userOther });
      } else if (health) {
        const access_token = createAccessToken({ id: health._id });
        res.json({ access_token, user: health });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /**
   *
   * @returns {message}
   */
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: `auth/refresh_token` });
      return res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const sendToken = (user, res, txt) => {
  const access_token = createAccessToken({ id: user._id });
  const refresh_token = createRefreshToken({ id: user._id });
  res.cookie("refreshtoken", refresh_token, {
    // sameSite: "none",
    // secure: true,
    httpOnly: true,
    path: `auth/refresh_token`,
<<<<<<< HEAD
    maxAge: 7 * 24 * 60 * 60 * 1000,
=======
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
>>>>>>> c0068f39feb9a84ab44969bf158e5d9518224031
  });

  res.json({
    msg: txt,
    access_token,
    user,
  });
};

const createAccessToken = (userId) => {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
const createRefreshToken = (userId) => {
  return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
const createActiveToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: "5m",
  });
};
module.exports = authCtrl;
