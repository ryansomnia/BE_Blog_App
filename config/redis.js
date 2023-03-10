const { createClient } = require("redis");

const client = createClient();

exports.setRedis=(key, val) => {
  client.on('error', err => console.log('Redis Client Error', err));
  client.connect();

  client.set(key, val)
  client.disconnect();
};

exports.getRedis= async (key) => {
  try {
 client.on('error', err => console.log('Redis Client Error', err));
 client.connect();
   let data = await client.get(key)
      client.disconnect();
      return data;
      
     
  } catch (err) {
    console.log(err);
    client.disconnect();
    return err;
  }
 

};


