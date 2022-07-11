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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const User_1 = require("../entity/User");
class UserController {
}
exports.default = UserController;
_a = UserController;
UserController.listAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({
            select: [
                "id", "username", "role"
            ]
        });
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
UserController.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findOneBy({ id: parseInt(id) });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
UserController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    const user = new User_1.User();
    user.username = username;
    user.password = password;
    user.role = role;
    console.log(user);
    const verifyUsername = yield User_1.User.findOneBy({ username: username });
    if (verifyUsername)
        return res.status(400).send({ message: "el usuario ya existe" });
    const errors = yield (0, class_validator_1.validate)(user);
    if (errors.length > 0)
        return res.status(400).send(errors);
    user.hashPassword();
    yield user.save();
    console.log(user);
    return res.json(user);
});
UserController.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, role } = req.body;
    try {
        const user = yield User_1.User.findOneBy({ id: parseInt(id) });
        if (!user)
            return res.status(404).json({ message: "Not user found" });
        user.username = username;
        user.role = role;
        const errors = yield (0, class_validator_1.validate)(user);
        if (errors.length > 0)
            return res.status(400).send(errors);
        yield User_1.User.update({ id: parseInt(id) }, user);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield User_1.User.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "User not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
//# sourceMappingURL=user.controller.js.map