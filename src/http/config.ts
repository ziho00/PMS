let HOST: { [key: string]: string } = {
  development: "http://localhost:3000",
  production: "http://116.62.70.150",
};

export const host: string =
  HOST[process.env.NODE_ENV] || "http://localhost:3000";
