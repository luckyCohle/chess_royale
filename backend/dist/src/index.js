"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = require("./db/pool");
const http_server_1 = require("./server/http/http.server");
const ws_server_1 = __importDefault(require("./server/ws/ws.server"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, pool_1.checkDBConnection)();
        yield (0, http_server_1.startHttpServer)();
        yield (0, ws_server_1.default)();
    });
}
bootstrap();
