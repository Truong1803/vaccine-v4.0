const OrganInjectionRegister = require("../../model/organ_injection_register");
const HealthOrganization = require("../../model/healthOrganization");
const Vaccine = require("../../model/vaccine");
const XLSX = require("xlsx");
const fs = require("fs");
const OrganInjectionRegisterCtrl = {
  registerInjection: async (req, res) => {
    try {
      var workbook = XLSX.readFile(req.file.path);
      var sheet_name_list = workbook.SheetNames;
      var xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      const old_key = [
        "STT",
        "Họ và Tên",
        "Giới tính",
        "Ngày sinh",
        "E-mail",
        "Nghề nghiệp",
        "Số điện thoại",
        "CMND/CCCD",
        "BHYT",
        "Tỉnh/Thành Phố",
        "Quận/Huyện",
        "Phường/Xã",
        "Ngày muốn tiêm",
        "Đăng ký mũi thứ",
        "Loại vắc xin",
      ];
      const new_key = [
        "STT",
        "name",
        "gender",
        "dob",
        "email",
        "job",
        "phonenumber",
        "identification",
        "bhyt",
        "province",
        "district",
        "ward",
        "injectionDate",
        "dose",
        "vaccine",
      ];
      xlData.forEach((item) => {
        for (let i = 0; i < new_key.length; i++) {
          Object.defineProperty(
            item,
            new_key[i],
            Object.getOwnPropertyDescriptor(item, old_key[i])
          );
          delete item[old_key[i]];
        }
      });
      removeTmp(req.file.path);
      res.json(xlData);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = OrganInjectionRegisterCtrl;
