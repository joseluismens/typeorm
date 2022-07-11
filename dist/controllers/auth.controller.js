"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
const User_1 = require("../entity/User");
const config_1 = __importDefault(require("../config/config"));
class AuthController {
}
exports.default = AuthController;
_a = AuthController;
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!(username && password))
        return res.status(400).send();
    const user = yield User_1.User.findOneBy({ username: username });
    if (!user)
        return res.status(400).send({ message: "user not exists" });
    //check password
    if (!user.checkIfUnencryptedPasswordIsValid(password))
        return res.status(400).send({ message: "incorrect password" });
    const token = jwt.sign({
        userId: user.id,
        username: username
    }, config_1.default.jwtSecret, { expiresIn: '1h' });
    res.header('auth-token', token).json({ "token": token });
});
AuthController.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.header('auth-token'));
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword))
        return res.status(400).send();
    const user = yield User_1.User.findOneBy(id);
    if (!user)
        return res.status(401).send();
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword))
        return res.status(401).send();
    user.password = newPassword;
    const errors = yield (0, class_validator_1.validate)(user);
    if (errors.length > 0)
        return res.status(400).send(errors);
    //Hash the new password and save
    user.hashPassword();
    User_1.User.update({ id: id }, user);
    res.status(204).send();
});
//# sourceMappingURL=auth.controller.js.map