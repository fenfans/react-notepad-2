import * as path from "path";

import appServer from './server';
import config from './config';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

appServer.start(config.serverPort, () => {
})
