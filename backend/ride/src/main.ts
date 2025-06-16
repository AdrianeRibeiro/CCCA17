import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";

import Registry from "./infra/di/Registry";

const connection = new PgPromiseAdapter();
const httpServer = new ExpressAdapter()
/* injeção de dependência
new AccountController(httpServer, signup, getAccount)
*/

httpServer.listen(3000)