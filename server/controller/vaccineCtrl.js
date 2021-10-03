const Vaccines = require("../model/vaccine");

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

const vaccineCtrl = {
  getAll: async (req, res) => {
    try {
      const total = await Vaccines.countDocuments({});
      const features = new APIfeature(Vaccines.find(), req.query)
        .filtering()
        .paginating();
      const data = await features.query;
      return res.json({ data, total });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const vaccine = await Vaccines.findById({ _id: req.params.id });
      return res.json({ data: vaccine });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * tạo mói vắc xin
   * @param {*}  country,
   * @param {*}     name_vaccine,
   * @param {*}     production_unit,
   * @param {*}     time_step,
   * @param {*}     num_ijection,
   * @param {*}     use_obj,
   * @returns {message, newVaccine}
   */
  createItem: async (req, res) => {
    try {
      const {
        country,
        name_vaccine,
        production_unit,
        time_step,
        num_ijection,
        use_obj,
      } = req.body;
      const newItem = new Vaccines({
        country,
        name_vaccine,
        production_unit,
        time_step,
        num_ijection,
        use_obj,
      });
      await newItem.save();
      return res.json({ msg: "Create vaccine success", data: newItem });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  /**
   * xoá vắc xin
   * @param {*} id
   * @returns {message, vaccineDeleted}
   */
  delete: async (req, res) => {
    try {
      const vaccineDelete = await Vaccines.findByIdAndDelete({
        _id: req.params.id,
      });
      res.json({ msg: "Deleted a vaccine", data: vaccineDelete });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  /**
   * cập nhật vắcxin
   * @param {*} id
   * @param {*}  country,
   * @param {*}     name_vaccine,
   * @param {*}     production_unit,
   * @param {*}     time_step,
   * @param {*}     num_ijection,
   * @param {*}     use_obj,
   * @returns {message, vaccineUpdated}
   */
  update: async (req, res) => {
    try {
      const {
        country,
        name_vaccine,
        production_unit,
        time_step,
        num_ijection,
        use_obj,
      } = req.body;
      const vaccineUpdate = await Vaccines.findByIdAndUpdate(
        { _id: req.params.id },
        {
          country,
          name_vaccine,
          production_unit,
          time_step,
          num_ijection,
          use_obj,
        },
        { new: true }
      );
      res.json({ msg: "Updated a vaccine", data: vaccineUpdate });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = vaccineCtrl;
