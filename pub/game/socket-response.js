"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketResponse = void 0;
var SocketResponse = /** @class */ (function () {
    function SocketResponse(success, error, data, message) {
        this.success = success;
        this.error = error;
        this.data = data;
        this.message = message;
    }
    return SocketResponse;
}());
exports.SocketResponse = SocketResponse;
//# sourceMappingURL=socket-response.js.map