// import { APIGatewayProxyHandler } from "aws-lambda";
// import { createConnection, OkPacket } from "mysql2";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// export const getRewards: APIGatewayProxyHandler = async (event) => {
//     const body = JSON.parse(event.body ?? "") as UserInformation
//     let statusCode: number = 200
//     let messageBody: string = ""
//     connection.query(
//         'SELECT GameID, Score FROM testTable WHERE Name = ? AND UserTransaction = ?',
//         [body.fullName, body.userTransaction],
//         function(err, results: OkPacket){
//             if (results.affectedRows === 0) {
//                 statusCode = 404
//                 messageBody = JSON.stringify({ message: 'Not found' })
//             }
//             else {
//                 statusCode = 200
//                 messageBody = JSON.stringify(results)
//             }
//         }
//     )
//     return {
//         statusCode,
//         body: messageBody
//     }
// }
exports.getRewards = function (event, context) { return __awaiter(_this, void 0, void 0, function () {
    var body, results;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = JSON.parse((_a = event.body) !== null && _a !== void 0 ? _a : "");
                return [4 /*yield*/, mysql.query('SELECT GameID, Score FROM testTable WHERE Name = ? AND UserTransaction = ?', [body.fullName, body.userTransaction])];
            case 1:
                results = _b.sent();
                return [4 /*yield*/, mysql.end()];
            case 2:
                _b.sent();
                if (results === 0) {
                    return [2 /*return*/, {
                            statusCode: 404,
                            body: 'Not Found'
                        }];
                }
                return [2 /*return*/, results];
        }
    });
}); };
//# sourceMappingURL=getRewards.js.map