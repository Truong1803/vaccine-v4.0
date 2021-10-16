const HealthOrganization = require("../../model/healthOrganization");
const bcrypt = require("bcrypt");
const sendEmailRegister = require("../../config/sendEmailOrgan");
const Users = require("../../model/user");
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
const healthOganizationCtrl = {
  /**
   *
   * @returns {data,totalPage}
   */
  getAll: async (req, res) => {
    try {
      const userCurrent = await HealthOrganization.findById({
        _id: req.user.id,
      });
      if (userCurrent) {
        if (userCurrent.role === 6) {
          const total = await HealthOrganization.countDocuments({});
          const features = new APIfeature(HealthOrganization.find(), req.query)
            .filtering()
            .paginating();
          const data = await features.query;
          return res.json({ data, total });
        } else if (userCurrent.role === 5) {
          const total = await HealthOrganization.countDocuments({
            provinceId: userCurrent.provinceId,
            role: 4,
          });

          const features = new APIfeature(
            HealthOrganization.find({
              province: userCurrent.province,
              role: 4,
            }),
            req.query
          )
            .filtering()
            .paginating();
          const data = await features.query;

          return res.json({ data, total });
        } else if (userCurrent.role === 4) {
          const total = await HealthOrganization.countDocuments({
            district: userCurrent.district,
            role: 3,
          });
          const features = new APIfeature(
            HealthOrganization.find({
              district: userCurrent.district,
              role: 3,
            }),
            req.query
          )
            .filtering()
            .paginating();
          const data = await features.query;
          return res.json({ data, total });
        }
      } else {
        const userCurrent = await Users.findById({ _id: req.user.id });
        const total = await HealthOrganization.countDocuments({
          role: 3,
        });
        const features = new APIfeature(
          HealthOrganization.find({ role: 3 }),
          req.query
        )
          .filtering()
          .paginating();
        const data = await features.query;
        return res.json({ data, total });
      }
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
      const user = await HealthOrganization.findById({ _id: req.params.id });
      return res.json({ data: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * tạo mói tổ chức y tế
  * @param {*}email,
  * @param {*}     organization,
  * @param {*}    represent,
  * @param {*}    phonenumber,
  * @param {*}    province,
  * @param {*}    district,
  * @param {*}    ward,
  * @param {*}    address,
  
   * @returns {message, newUser}
   */
  createOrgan: async (req, res) => {
    try {
      const {
        email,
        organization,
        represent,
        phonenumber,
        province,
        district,
        ward,
        address,
      } = req.body;
      const user = await HealthOrganization.findOne({ email, organization });
      if (user)
        return res.status(400).json("Sở ý tế quận huyện này đã tồn tại");
      const password = "123456";
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new HealthOrganization({
        email,
        organization,
        represent,
        phonenumber,
        province,
        district,
        ward,
        address,
        password: passwordHash,
        role: 4,
      });
      newUser.save();
      sendEmailRegister(email, email, password);
      return res.json({
        msg: "Tạo mói sở y tế quận huyện thành công",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // createOrgan: async (req, res) => {
  //   try {
  //     const {
  //       email,
  //       organization,
  //       represent,
  //       phonenumber,
  //       province,
  //       district,
  //       ward,
  //       address,
  //     } = req.body;
  //     const user = await HealthOrganization.findOne({ email, organization });
  //     if (user)
  //       return res.status(400).json("Sở ý tế quận huyện này đã tồn tại");
  //     const password = "123456";
  //     const passwordHash = await bcrypt.hash(password, 10);
  //     const newUser = new HealthOrganization({
  //       email,
  //       organization,
  //       represent,
  //       phonenumber,
  //       province,
  //       district,
  //       ward,
  //       address,
  //       password: passwordHash,
  //       role: 4,
  //     });
  //     newUser.save();
  //     return res.json({
  //       msg: "Tạo mói sở y tế quận huyện thành công",
  //       data: newUser,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }
  // },
  /**
   *cập nhật 1 tổ chức y tế
   *
   * @param {*} email,
   * @param {*}     password,
   * @param {*}    organization,
   * @param {*}     represent,
   * @param {*}     phonenumber,
   * @param {*}     province,
   * @param {*}     district,
   * @param {*}     ward,
   * @param {*}     address,
   * @param {*}     role,
   * @returns {message, userUpdate}
   */
  updateOrgan: async (req, res) => {
    try {
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
        role,
      } = req.body;
      const user = await HealthOrganization.findByIdAndUpdate(
        { _id: req.params._id },
        {
          email,
          password,
          organization,
          represent,
          phonenumber,
          province,
          district,
          ward,
          address,
          role,
        },
        { new: true }
      );
      return res.json({ msg: "Cập nhật thành công", data: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * tạo mới đơn vị tiêm chủng
   *
   * @param {*} email,
   * @param {*}     organization,
   * @param {*}     represent,
   * @param {*}     phonenumber,
   * @param {*}     province,
   * @param {*}     district,
   * @param {*}     ward,
   * @param {*}     address,
   * @param {*}     num_table,
   * @returns {message,newUser}
   */
  createOrganWard: async (req, res) => {
    try {
      const {
        email,
        organization,
        represent,
        phonenumber,
        province,
        district,
        ward,
        address,
        num_table,
      } = req.body;
      const user = await HealthOrganization.findOne({ email, organization });
      if (user) return res.status(400).json("Đơn vị tiêm chủng này đã tồn tại");
      const password = "123456";
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new HealthOrganization({
        email,
        organization,
        represent,
        phonenumber,
        province,
        district,
        ward,
        address,
        password: passwordHash,
        role: 3,
        num_table,
      });
      newUser.save();
      sendEmailRegister(email, email, password);
      return res.json({
        msg: "Tạo mới đơn vị tiêm chủng thành công",
        data: newUser,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * cập nhật 1 đơnv ị tiêm
   * @param {*} email,
   * @param {*}     organization,
   * @param {*}     represent,
   * @param {*}     phonenumber,
   * @param {*}     province,
   * @param {*}     district,
   * @param {*}     ward,
   * @param {*}     address,
   * @param {*}     num_table,
   * @returns {message,userUpdate}
   */
  updateOrganWard: async (req, res) => {
    try {
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
        role,
        num_table,
      } = req.body;
      const user = await HealthOrganization.findByIdAndUpdate(
        { _id: req.params._id },
        {
          email,
          password,
          organization,
          represent,
          phonenumber,
          province,
          district,
          ward,
          address,
          role,
          num_table,
        },
        { new: true }
      );
      return res.json({ msg: "Cập nhật thành công", data: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * xoá tổ chức y tế
   * @param {*} id
   * @returns {message}
   */
  deleteOrgan: async (req, res) => {
    try {
      const organ = await HealthOrganization.findByIdAndDelete({
        _id: req.params.id,
      });
      return res.json({ msg: "Xoá một tổ chức thành công", data: organ });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * tạo mới tổ chức y tế (của admin)
   * @param {*}  represent,
   * @param {*}    phonenumber,
   * @param {*}     email,
   * @param {*}     province,
   * @param {*}      district,
   * @param {*}     ward,
   * @param {*}     password,
   * @param {*}     organization,
   * @param {*}    role,
   * @returns {message,newUser}
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
      console.log(req.body);
      const user = await HealthOrganization.findOne({ email, organization });
      if (user) return res.status(400).json({ msg: "Tổ chức đã tồn tại" });

      const passwordHash = await bcrypt.hash(password, 10);
      if (role == 3) {
        const newUser = new HealthOrganization({
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
      const newUser = new HealthOrganization({
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
   * cập nhật tổ chức y tế (của admin)
   * @param {*} id
   * @param {*}  represent,
   * @param {*}    phonenumber,
   * @param {*}     email,
   * @param {*}     province,
   * @param {*}      district,
   * @param {*}     ward,
   * @param {*}     password,
   * @param {*}     organization,
   * @param {*}    role,
   * @returns {message,newUser}
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
      const newUser = await HealthOrganization.findByIdAndUpdate(
        { _id: req.params.id },
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

module.exports = healthOganizationCtrl;
