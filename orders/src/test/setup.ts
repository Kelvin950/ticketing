import  request  from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';


declare global {
  var signup:()=> string[];
}


jest.mock('../nats-wrapper.ts');

let mongo: any;
beforeAll(async () => {
  process.env.JWt_KEY =  "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

beforeEach(async  ()=>{
const collections =  await mongoose.connection.db.collections();

for(let collection of collections){

    await collection.deleteMany({})
}

});

afterAll(async ()=>{

    // await mongo.stop();
    await mongoose.connection.close();
})




global.signup = ()=>{

  // const email =  "test@test.com";
  // const password =  "password"

  // const res = await request(app)
  // .post("/api/users/signup")
  // .send({
  //   email ,password
  // })
  // .expect(201);


  // const cookie =  res.get("Set-Cookie");

  // return cookie;
  
  //build a JWT payload. {id,email}
  const payload = {
    id:new mongoose.Types.ObjectId().toHexString(),
    email:"test@test.com"
  }
  //create the jwt
 const token  = jwt.sign(payload , "asdf");
  //build the session object.
  //turn the session into json
 const session =  {jwt:token};
 const sessionJson =  JSON.stringify(session);
  //take json and encode  it to base64
const base64 =  Buffer.from(sessionJson).toString("base64");
  //return a string thats the cookie with the encoded data
console.log([`session=${base64}=`]);
return [`session=${base64}`];

};