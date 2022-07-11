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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const User_1 = require("../entity/User");
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;
        //Get user role from the database
        const user = yield User_1.User.findOneOrFail(id);
        if (!user)
            return res.status(401).send();
        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1)
            next();
        else
            res.status(401).send();
    });
};
exports.checkRole = checkRole;
//# sourceMappingURL=checkRole.js.map