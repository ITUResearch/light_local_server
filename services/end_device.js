const flatten = require("flat");
const unflatten = require("flat").unflatten;
const { promisify } = require("util");
const END_DEVICE = "end_device:";

const saveToTable = async (client, info) => {
  const saveObjAsync = promisify(client.hmset).bind(client);
  const key = END_DEVICE + info.eid;
  await client.del(key);
  const res = await saveObjAsync(key, info).catch(err => err);
  return res;
};

const getEndDevice = async (client, eid) => {
  const getObjFromKeyAsync = promisify(client.hgetall).bind(client);
  const key = END_DEVICE + eid;
  const res = await getObjFromKeyAsync(key).catch(err => err);
  // console.log("res", res);

  return unflatten(res);
};

const getAllEndDevices = async client => {
  const getKeysAsync = promisify(client.keys).bind(client);
  const keys = await getKeysAsync(END_DEVICE + "*");
  const res = [];
  for (const key of keys) {
    res.push(await getEndDevice(client, key.split(":")[1]));
  }
  return res;
};

module.exports = { saveToTable, getEndDevice, getAllEndDevices };
