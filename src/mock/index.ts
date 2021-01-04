import Mock from "mockjs";

Mock.mock("http://localhost:3000/login", {
  code: 0,
  msg: "成功!",
  data: {
    user_id: 1001,
    phone: "17727261745",
    email: "1253416625@qq.com",
    username: "曾梓豪",
    token: "asdadasday12315xasdaadad",
  },
});

Mock.mock("http://localhost:3000/logout", {
  code: 0,
  msg: "成功!",
  data: null,
});
