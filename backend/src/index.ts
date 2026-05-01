import { checkDBConnection } from "./db/pool";
import { startHttpServer } from "./server/http/http.server";
import startWsServer from "./server/ws/ws.server";

async function bootstrap() {
    await checkDBConnection();
    await startHttpServer();
    await startWsServer();
}
bootstrap();
