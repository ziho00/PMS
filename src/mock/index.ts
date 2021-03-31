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
    avatar:
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
  },
});

Mock.mock("http://localhost:3000/logout", {
  code: 0,
  msg: "成功!",
  data: null,
});

Mock.mock("http://localhost:3000/userInfo", {
  code: 0,
  msg: "成功!",
  data: {
    user_id: 1001,
    phone: "17727261745",
    email: "1253416625@qq.com",
    username: "曾梓豪",
    avatar:
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    token: "asdadasday12315xasdaadad",
    role: {
      permissions: [
        "BASIC",
        "WORKPLACE",
        "PROJECT",
        "SETTING",
        "TASK",
        "REQUIREMENT",
        "VERSION",
        "BUG",
        "STORY_WALL",
        "CHARTS",
        "PROJECT_SETTING",
      ],
    },
  },
});

Mock.mock("http://localhost:3000/project/all", {
  code: 0,
  msg: "成功!",
  data: [
    {
      project_id: 1,
      picUrl:
        "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
      name: "项目名",
      desc: "项目描述项目描述项目描述项目描述项目描述项目描述",
    },
    {
      project_id: 2,
      picUrl:
        "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
      name: "项目名2",
      desc:
        "项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述项目描述",
    },
    {
      project_id: 3,
      picUrl:
        "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
      name: "项目名3",
      desc: "项目描述项目描述项目描述项目描述项目描述项目描述",
    },
    {
      project_id: 4,
      picUrl:
        "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
      name: "项目名4",
      desc: "项目描述项目描述项目描述项目描述项目描述项目描述",
    },
    {
      project_id: 5,
      picUrl:
        "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
      name: "项目名5",
      desc: "项目描述项目描述项目描述项目描述项目描述项目描述",
    },
  ],
});

Mock.mock("http://localhost:3000/workload/summary/7", {
  code: 0,
  msg: "成功!",
  data: [
    {
      date: "2020-12-31",
      workload: 10,
    },
    {
      date: "2021-01-01",
      workload: 8,
    },
    {
      date: "2021-01-02",
      workload: 8,
    },
    {
      date: "2021-01-03",
      workload: 0,
    },
    {
      date: "2021-01-04",
      workload: 8,
    },
    {
      date: "2021-01-05",
      workload: 10,
    },
    {
      date: "2021-01-06",
      workload: 10,
    },
  ],
});

Mock.mock("http://localhost:3000/news/8", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 10,
    total: 18,
    data: [
      {
        id: 100101,
        create_user: {
          user_id: 10021,
          username: "Jack Ma",
          avatarUrl: null,
        },
        createTime: "2021-01-06 10:32:30",
        operation: "create",
        type: "task",
        data: {
          title: "完成工作台的项目、工作指数、消息部分模块",
          id: "10011",
        },
      },
      {
        id: 100102,
        create_user: {
          user_id: 10021,
          username: "@name",
          avatarUrl: null,
        },
        createTime: "2021-01-05 14:38:15",
        operation: "create",
        type: "requirement",
        data: {
          title: "工作台模块-任务",
          id: "1000135",
        },
      },
      {
        id: 100103,
        create_user: {
          user_id: 10021,
          username: "@name",
          avatarUrl: null,
        },
        createTime: "2021-01-05 14:35:12",
        operation: "create",
        type: "requirement",
        data: {
          title: "工作台模块-消息",
          id: "1000134",
        },
      },
      {
        id: 100104,
        create_user: {
          user_id: 10021,
          username: "@name",
          avatarUrl: null,
        },
        createTime: "2021-01-05 14:33:50",
        operation: "create",
        type: "requirement",
        data: {
          title: "工作台模块-工作指数",
          id: "1000133",
        },
      },
      {
        id: 100106,
        create_user: {
          user_id: 10021,
          username: "Mary Zhou",
          avatarUrl: null,
        },
        createUser: "Mary Zhou",
        createTime: "2021-01-05 09:48:25",
        operation: "update",
        type: "requirement",
        data: {
          title: "工作台模块",
          id: "1000131",
        },
      },
      {
        id: 100107,
        create_user: {
          user_id: 10021,
          username: "Team leader",
          avatarUrl: null,
        },
        createUser: "Team leader",
        createTime: "2021-01-04 10:25:30",
        operation: "create",
        type: "task",
        data: {
          title: "登录页开发(包含注册模块)",
          id: "100001",
        },
      },
    ],
  },
});

Mock.mock("http://localhost:3000/task/0", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 2,
    total: 2,
    data: [
      {
        task_id: "10011",
        title: "完成工作台的项目、工作指数、消息部分模块",
        handler: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "曾梓豪",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        status: "0",
        priority: "1",
        planStartDate: "2020-01-07",
        planEndDate: "2020-01-07",
        planWorkload: 10,
        workload: 0,
      },
      {
        task_id: "100001",
        title: "登录页开发(包含注册模块)",
        handler: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "曾梓豪",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        status: "0",
        priority: "3",
        planStartDate: "2020-01-04",
        planEndDate: "2020-01-04",
        planWorkload: 10,
        workload: 6,
      },
    ],
  },
});

Mock.mock("http://localhost:3000/task/10011", {
  code: 0,
  msg: "成功!",
  data: {
    task_id: "10011",
    title: "完成工作台的项目、工作指数、消息部分模块",
    handler: {
      user_id: 1001,
      phone: "17727261745",
      email: "1253416625@qq.com",
      username: "曾梓豪",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    },
    desc: "<p>asdasdasd</p><p>sdaaaaaaaaa</p>",
    status: "0",
    priority: "1",
    planStartDate: "2020-01-07",
    planEndDate: "2020-01-07",
    planWorkload: 10,
    workload: 8,
  },
});

Mock.mock("http://localhost:3000/users/all", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 5,
    total: 5,
    data: [
      {
        user_id: 10011,
        username: "曾梓豪",
        phone: "17727261745",
        email: "1253416625@qq.com",
        avatarUrl: "",
        role: {
          role_id: 1011,
          role_name: "研发人员",
        },
        createTime: "2020-12-31 23:59:59",
      },
      {
        user_id: 10012,
        username: "Jack Ma",
        phone: "13121161641",
        email: "JackMa@163.com",
        avatarUrl: "",
        role: {
          role_id: 1012,
          role_name: "项目管理人员",
        },
        createTime: "2021-01-01 23:59:59",
      },
      {
        user_id: 10013,
        username: "Team leader",
        phone: "131221611870",
        email: "131221611870@163.com",
        avatarUrl: "",
        role: {
          role_id: 1012,
          role_name: "项目管理人员",
        },
        createTime: "2021-01-01 22:55:30",
      },
      {
        user_id: 10014,
        username: "Michelle Perez",
        phone: "135121311882",
        email: "MichellePerez@email.com",
        avatarUrl: "",
        role: {
          role_id: 1011,
          role_name: "研发人员",
        },
        createTime: "2020-12-31 23:59:59",
      },
      {
        user_id: 1,
        username: "admin",
        phone: "",
        email: "",
        avatarUrl: "",
        role: {
          role_id: 1,
          role_name: "超级管理员",
        },
        createTime: "2020-12-31 23:59:59",
      },
    ],
  },
});

Mock.mock("http://localhost:3000/users/1", {
  code: 0,
  msg: "成功!",
  data: {
    user_id: 1,
    username: "admin",
    phone: "",
    email: "",
    avatarUrl: "",
    role: {
      role_id: 1,
      role_name: "超级管理员",
    },
    createTime: "2020-12-31 23:59:59",
  },
});

Mock.mock("http://localhost:3000/roles/all", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 4,
    total: 4,
    data: [
      {
        role_id: 1,
        role_name: "超级管理员",
        promission: ["WORKPLACE", "PROJECT", "SETTING"],
        createTime: "2021-01-15 15:55:34",
      },
      {
        role_id: 1011,
        role_name: "研发人员",
        promission: ["WORKPLACE", "PROJECT"],
        createTime: "2021-01-15 15:55:34",
      },
      {
        role_id: 1012,
        role_name: "项目管理人员",
        promission: ["WORKPLACE", "PROJECT"],
        createTime: "2021-01-15 15:55:34",
      },
      {
        role_id: 1013,
        role_name: "系统管理人员",
        promission: ["WORKPLACE", "PROJECT", "SETTING"],
        createTime: "2021-01-15 15:55:34",
      },
    ],
  },
});

Mock.mock("http://localhost:3000/authority/all", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 3,
    total: 3,
    data: [
      {
        authority_id: 1,
        name: "工作台页",
        token: "WORKPLACE",
        createTime: "2021-01-15 15:55:34",
      },
      {
        authority_id: 2,
        name: "项目页",
        token: "PROJECT",
        createTime: "2021-01-15 15:55:34",
      },
      {
        authority_id: 3,
        name: "设置页",
        token: "SETTING",
        createTime: "2021-01-15 15:55:34",
      },
    ],
  },
});

Mock.mock("http://localhost:3000/project/1", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 3,
    total: 3,
    data: {
      project_id: 1,
      picUrl:
        "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
      name: "项目名",
      desc: "项目描述项目描述项目描述项目描述项目描述项目描述",
    },
  },
});

Mock.mock("http://localhost:3000/version/all", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 3,
    total: 3,
    data: [
      {
        version_id: "10013",
        version_num: "v1.0.2",
        desc: "",
        planStartDate: "2020-04-01",
        planEndDate: "2021-05-01",
      },
      {
        version_id: "10012",
        version_num: "v1.0.1",
        desc: "",
        planStartDate: "2021-03-01",
        planEndDate: "2021-04-01",
      },
      {
        version_id: "10011",
        version_num: "v1.0.0",
        desc: "",
        planStartDate: "2020-12-31",
        planEndDate: "2021-03-01",
      },
    ],
  },
});

Mock.mock("http://localhost:3000/bug/0", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 2,
    total: 2,
    data: [
      {
        bug_id: "10011",
        title: "注册功能点击确认后无响应",
        handler: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "曾梓豪",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        creater: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "测试人员",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        version_id: "10013",
        version: {
          version_id: "10013",
          version_num: "v1.0.2",
          desc: "",
          planStartDate: "2020-04-01",
          planEndDate: "2021-05-01",
        },
        module: "注册功能",
        status: "0",
        priority: "1",
        createTime: "2020-12-31 15:55:30",
        updateTime: "2020-12-31 15:55:30",
      },
      {
        bug_id: "100001",
        title: "未登录情况可以进入首页",
        handler: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "曾梓豪",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        creater: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "测试人员",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        version_id: "10013",
        version: {
          version_id: "10013",
          version_num: "v1.0.2",
          desc: "",
          planStartDate: "2020-04-01",
          planEndDate: "2021-05-01",
        },
        module: "首页",
        status: "0",
        priority: "3",
        createTime: "2020-12-31 15:11:28",
        updateTime: "2020-12-31 15:11:28",
      },
    ],
  },
});

Mock.mock("http://localhost:3000/bug/10011", {
  code: 0,
  msg: "成功!",
  data: {
    bug_id: "10011",
    title: "注册功能点击确认后无响应",
    desc: "<p>asdasdasd</p><p>sdaaaaaaaaa</p>",
    handler: {
      user_id: 1001,
      phone: "17727261745",
      email: "1253416625@qq.com",
      username: "曾梓豪",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    },
    creater: {
      user_id: 1001,
      phone: "17727261745",
      email: "1253416625@qq.com",
      username: "测试人员",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    },
    version_id: "10013",
    version: {
      version_id: "10013",
      version_num: "v1.0.2",
      desc: "",
      planStartDate: "2020-04-01",
      planEndDate: "2021-05-01",
    },
    module: "注册功能",
    status: "0",
    priority: "1",
    createTime: "2020-12-31 15:55:30",
    updateTime: "2020-12-31 15:55:30",
  },
});

Mock.mock("http://localhost:3000/requirement/all", {
  code: 0,
  msg: "成功!",
  data: {
    start: 0,
    length: 2,
    total: 2,
    data: [
      {
        requirement_id: "10010",
        title: "工作台模块-任务",
        desc: "<p>asdasdasd</p><p>sdaaaaaaaaa</p>",
        handler: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "曾梓豪",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        creater: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "Brian Walker",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        version_id: "10013",
        version: {
          version_id: "10013",
          version_num: "v1.0.2",
          desc: "",
          planStartDate: "2020-04-01",
          planEndDate: "2021-05-01",
        },
        status: "0",
        priority: "1",
        createTime: "2020-12-31 15:55:30",
        updateTime: "2020-12-31 15:55:30",
        planStartDate: "2020-12-31",
        planEndDate: "2021-01-04",
        planWorkload: 24,
      },
      {
        requirement_id: "10001",
        title: "工作台模块-消息",
        desc: "<p>asdasdasd</p><p>sdaaaaaaaaa</p>",
        handler: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "曾梓豪",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        creater: {
          user_id: 1001,
          phone: "17727261745",
          email: "1253416625@qq.com",
          username: "Angela Young ",
          avatar:
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        },
        version_id: "10013",
        version: {
          version_id: "10013",
          version_num: "v1.0.2",
          desc: "",
          planStartDate: "2020-04-01",
          planEndDate: "2021-05-01",
        },
        status: "0",
        priority: "3",
        createTime: "2021-01-05 14:35:12",
        updateTime: "2021-01-05 14:35:12",
        planStartDate: "2021-01-05",
        planEndDate: "2020-01-08",
        planWorkload: 24,
      },
    ],
  },
});

Mock.mock("http://localhost:3000/requirement/10010", {
  code: 0,
  msg: "成功!",
  data: {
    requirement_id: "10010",
    title: "工作台模块-任务",
    desc: "<p>asdasdasd</p><p>sdaaaaaaaaa</p>",
    handler: {
      user_id: 1001,
      phone: "17727261745",
      email: "1253416625@qq.com",
      username: "曾梓豪",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    },
    creater: {
      user_id: 1001,
      phone: "17727261745",
      email: "1253416625@qq.com",
      username: "测试人员",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    },
    version_id: "10013",
    version: {
      version_id: "10013",
      version_num: "v1.0.2",
      desc: "",
      planStartDate: "2020-04-01",
      planEndDate: "2021-05-01",
    },
    status: "0",
    priority: "1",
    createTime: "2020-12-31 15:55:30",
    updateTime: "2020-12-31 15:55:30",
    planStartDate: "2020-12-31",
    planEndDate: "2021-01-04",
    planWorkload: 24,
  },
});

Mock.mock("http://localhost:3000/task/worklaod", {
  code: 0,
  msg: "成功!",
  data: [
    {
      id: "10011",
      workload: 5,
      createTime: "2021-03-31 11:55:30",
      updateTime: "2021-03-31 11:55:30",
      desc: "1.完成 xxx 模块代码实现 2.完成代码自测",
    },
    {
      id: "10012",
      workload: 2,
      createTime: "2021-03-31 11:30:30",
      updateTime: "2021-03-31 11:30:30",
      desc: "制定开发任务",
    },
    {
      id: "10013",
      workload: 1,
      createTime: "2021-03-31 10:35:33",
      updateTime: "2021-03-31 10:35:33",
      desc: "需求评审",
    },
  ],
});
