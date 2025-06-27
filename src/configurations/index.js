import { NODE_ENV, VERCEL_BASE_URL, PORT, LOGGING } from "@env";
import { removeTrailingSlash } from "../utils/script";

const nodeEnv = __DEV__ ? NODE_ENV : 'prod'

const configurations = {
  nodeEnv,
  vercelBaseUrl : nodeEnv === 'prod' ? `${removeTrailingSlash(VERCEL_BASE_URL)}/api` : `http://localhost:${PORT}/api`,
  logging : nodeEnv === 'prod' ? false : LOGGING === 'true' ? true : false
};

export default configurations;
