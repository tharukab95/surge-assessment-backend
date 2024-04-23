const { register, login } = require("../../controllers/authController");
const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

describe("register function", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "testpassword",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = {};

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Required field/fields values missing.",
    });
  });

  it("should return 409 if username already exists", async () => {
    User.findOne = jest.fn().mockResolvedValue({ username: "testuser" });

    await register(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(409);
  });

  it("should create a new user and return status 200 with username and email", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    User.create = jest
      .fn()
      .mockResolvedValue({ username: "testuser", email: "test@example.com" });

    await register(req, res);

    expect(User.create).toHaveBeenCalledWith({
      username: req.body.username,
      email: req.body.email,
      password: expect.any(String),
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
    });
  });

  it("should return status 500 if error occurs during user creation", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    User.create = jest.fn().mockRejectedValue(new Error("Test error"));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Test error" });
  });
});

describe("login function", () => {
  let req;
  let res;
  let UserMock;

  beforeEach(() => {
    req = {
      cookies: {},
      body: {
        username: "testuser",
        password: "testpassword",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
      clearCookie: jest.fn(),
      cookie: jest.fn(),
    };
  });

  it("should return 400 if username or password is missing", async () => {
    req.body = {}; // Missing username and password

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Username and password are required.",
    });
  });

  it("should return 401 if user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("should return 401 if password does not match", async () => {
    User.findOne.mockResolvedValue({
      username: "testuser",
      password: "hashedpassword",
    });
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    await login(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });
});
