const request = require("supertest");
const app = require("../index");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/User");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("POST /api/auth/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if fields are missing", async () => {
    const response = await request(app).post("/api/auth/login").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email/Username and Password are required");
  });

  it("should return 401 for invalid credentials", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ emailOrUsername: "wrong@example.com", password: "wrongpass" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return 200 and a token for valid credentials", async () => {
    const mockUser = {
      _id: "123",
      username: "testuser",
      email: "test@example.com",
      password: "hashedpassword",
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-jwt-token");

    const response = await request(app)
      .post("/api/auth/login")
      .send({ emailOrUsername: "test@example.com", password: "correctpassword" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successfully");
    expect(response.body.token).toBe("fake-jwt-token");
    expect(response.body.loggedUser).toEqual({
      username: mockUser.username,
      email: mockUser.email,
    });
  });
});