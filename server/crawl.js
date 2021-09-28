app.use('/crawl', async (req, res) => {
  try {
    const huyen = await District.find();
    huyen.map(async (x) => {
      const res = await axios.get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${x.districtId}`,
        {
          headers: { token: '66e22083-17df-11ec-b8c6-fade198b4859' },
        }
      );
      const data = res.data.data;
      data.map(async (x1) => {
        const wardId = x1.WardCode;
        const name = x1.WardName;
        const districtId = x1.DistrictID;
        await new Ward({ wardId, name, districtId }).save();
      });
    });
    return res.json('crawl success');
  } catch (error) {}
});
