const Organization = require("../model/organization");
const bcrypt = require("bcrypt");
const sendEmailRegister = require("../config/sendEmailOrgan");
class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    //console.log(queryStr);
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const organizationCtrl = {
  /**
   *
   * @returns {alldata}
   */
  getAll: async (req, res) => {
    try {
      const total = await Organization.countDocuments({});
      const features = new APIfeature(Organization.find(), req.query)
        .filtering()
        .paginating();
      const data = await features.query;
      return res.json({ data, total });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   *
   * @param {*} id
   * @returns {user}
   */
  getById: async (req, res) => {
    try {
      const user = await Organization.findById({ _id: req.params.id });
      return res.json({ data: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * xoá 1 công ty
   * @param {*} id
   * @returns {message}
   *
   */
  deleteOrgan: async (req, res) => {
    try {
      const organ = await Organization.findByIdAndDelete({
        _id: req.params.id,
      });
      return res.json({ msg: "Xoá một tổ chức thành công", data: organ });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * tạo mới 1 tổ chức (admin)
   * @param {*} represent,
   * @param {*}    phonenumber,
   * @param {*}     email,
   * @param {*}    province,
   * @param {*}    district,
   * @param {*}    ward,
   * @param {*}    password,
   * @param {*}   organization,
   * @param {*}    role,
   * @returns {message, newUser}
   */
  createAdmin: async (req, res) => {
    try {
      const {
        represent,
        phonenumber,
        email,
        province,
        district,
        ward,
        password,
        organization,
        role,
      } = req.body;
      const user = await Organization.findOne({ email, organization });
      if (user) return res.status(400).json({ msg: "Tổ chức đã tồn tại" });

      const passwordHash = await bcrypt.hash(password, 10);
      if (role == 3) {
        const newUser = new Organization({
          represent,
          phonenumber,
          email,
          province,
          district,
          ward,
          password: passwordHash,
          organization,
          role,
          num_table: 1,
        });
        newUser.save();
        sendEmailRegister(email, email, password);
        return res.json({ data: newUser, msg: "Tạo mới tổ chức thành công" });
      }
      const newUser = new Organization({
        represent,
        phonenumber,
        email,
        province,
        district,
        ward,
        password: passwordHash,
        organization,
        role,
      });
      newUser.save();
      sendEmailRegister(email, email, password);
      return res.json({ data: newUser, msg: "Tạo mới tổ chức thành công" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   *
   * @param {*} id
   * @param {*} represent,
   * @param {*}    phonenumber,
   * @param {*}     email,
   * @param {*}    province,
   * @param {*}    district,
   * @param {*}    ward,
   * @param {*}    password,
   * @param {*}   organization,
   * @param {*}    role,
   * @returns {message, userUpdate}
   */
  updateAdmin: async (req, res) => {
    try {
      const {
        represent,
        phonenumber,
        email,
        province,
        district,
        ward,
        password,
        organization,
        role,
      } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await Organization.findByIdAndUpdate(
        { _id: req.body._id },
        {
          represent,
          phonenumber,
          email,
          province,
          district,
          ward,
          password: passwordHash,
          organization,
          role,
        },
        { new: true }
      );
      return res.json({ msg: "Cập nhật thành công", data: newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = organizationCtrl;
