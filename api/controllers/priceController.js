import fs from "fs";

export const allPrice = async (req, res) => {
  const data = fs.readFileSync("./data/price.json");
  let parseData = JSON.parse(data);
  let calculateData = parseData.data;
  res.json(calculateData);
};
