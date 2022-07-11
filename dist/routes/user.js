"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const checkJwt_1 = require("../middlewares/checkJwt");
const router = (0, express_1.Router)();
router
    .get('/users', [checkJwt_1.checkJwt], user_controller_1.default.listAll)
    .post('/users', user_controller_1.default.newUser);
router.get("/users/:id", user_controller_1.default.getUser)
    .put("/users/:id", user_controller_1.default.updateUser)
    .delete("/users/:id", user_controller_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map