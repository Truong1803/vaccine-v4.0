const OrganInjectionRegister = require("../../model/organ_injection_register");
const HealthOrganization = require("../../model/healthOrganization");
const Wards = require("../../model/ward");
const Districts = require("../../model/district");
const Provinces = require("../../model/province");
const Vaccine = require("../../model/vaccine");
const Users = require("../../model/user");
const XLSX = require("xlsx");
const fs = require("fs");
const vaccine = require("../../model/vaccine");
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
        "Đơn vị tiêm",
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
        "healthOrganization",
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
      let userPhoneArr = [];
      const vaccineIdReg = await Vaccine.findOne({
        name_vaccine: xlData[0].vaccine,
      });
      for (const [index, item] of xlData.entries()) {
        const user = await Users.findOne({ phonenumber: item.phonenumber });

        if (user) {
          if (user.doseInformation[0]) {
            if (user.doseInformation[0].vaccineId === vaccineIdReg._id) {
              userPhoneArr.push(user.phonenumber);
            } else {
              return res.status(400).json({
                msg: `Đối tượng ${user.name} không đủ điều kiện tiêm vắc xin ${item.vaccine}`,
              });
            }
          } else {
            userPhoneArr.push(user.phonenumber);
          }
        } else {
          userPhoneArr.push(item.phonenumber);
          const province = await Provinces.findOne({ name: item.province });
          const district = await Districts.findOne({ name: item.district });
          const ward = await Wards.findOne({ name: item.ward });

          const newUser = new Users({
            phonenumber: item.phonenumber,
            identification: item.identification,
            name: item.name,
            gender: item.gender,
            dob: item.dob,
            province: {
              id: province.provinceId,
              name: province.name,
            },
            district: {
              id: district.districtId,
              name: district.name,
            },
            ward: {
              id: ward.wardId,
              name: ward.name,
            },
            address: item.address,
            email: item.email,
            bhyt: item.bhyt,
          });
          await newUser.save();
        }
      }
      const healthOrganization = await HealthOrganization.findOne({
        organization: xlData[0].healthOrganization,
      });
      const dataReturn = {
        organizationId: req.user.id,
        userPhone: userPhoneArr,
        healthOrganizationId: healthOrganization._id,
        vaccineId: vaccineIdReg._id,
        injectionDate: xlData[0].injectionDate,
      };
      res.json({ data: dataReturn, msg: "Đăng ký thành công" });
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
