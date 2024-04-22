import config from "config";
import logger from "pino";
import dayjs from "dayjs";

const level = config.get("logLevel");

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
