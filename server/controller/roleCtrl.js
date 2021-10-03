const Roles = require("../model/role");

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
}

const roleCtrl = {
  /**
   *
   * @returns  {allData}
   */
  getAll: async (req, res) => {
    try {
      const features = new APIfeature(Roles.find(), req.query).filtering();
      const data = await features.query;
      return res.json(data);
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
      const role = await Roles.findById({ _id: req.params.id });
      return res.json({ data: role });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * tạo mới 1 quyền
   * @param {*} name
   * @param {*} id
   * @param {*} description
   * @returns {message,newUser}
   */
  createRole: async (req, res) => {
    try {
      const { name, description, id } = req.body;
      const role = await Roles.findOne({ name });
      if (role) return res.status(400).json({ msg: "Role is exist" });
      const newRole = new Roles({ name, description, id });
      await newRole.save();
      return res.json({ msg: "Create role success", data: newRole });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   *
   * @param {*} id
   * @returns {message, dataDeleted}
   */
  deleteRole: async (req, res) => {
    try {
      const role = await Roles.findByIdAndDelete({ _id: req.params.id });
      return res.json({ msg: "Deleted a role", data: role });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * cập nhật quyền
   *
   * @param {*} id (id params)
   * @param {*} name
   * @param {*} description
   * @param {*} id
   * @returns
   */
  updateRole: async (req, res) => {
    try {
      const { name, description, id } = req.body;
      const dataUpdate = await Roles.findByIdAndUpdate(
        { _id: req.params.id },
        { name, description, id },
        { new: true }
      );
      return res.json({ msg: "Updated a vaccine", data: dataUpdate });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = roleCtrl;
