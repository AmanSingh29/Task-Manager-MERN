const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/users.mo");
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("User Model Test", () => {
  it("should create & save user successfully", async () => {
    const userData = new User({
      name: "Test User",
      email: "test@gmail.com",
      password: "123456",
    });
    const savedUser = await userData.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe("Test User");
    expect(savedUser.email).toBe("test@gmail.com");
  });

  it("should fail to create User without email", async () => {
    const userWithoutEmail = new User({
      name: "test user",
      password: "123456",
    });
    let err;
    try {
      await userWithoutEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });
});
