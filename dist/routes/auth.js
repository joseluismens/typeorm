"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const checkJwt_1 = require("../middlewares/checkJwt");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.default.login);
router.post("/change-password", [checkJwt_1.checkJwt], auth_controller_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map