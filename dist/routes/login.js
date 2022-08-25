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
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const getUserByEmail_1 = require("../services/getUserByEmail");
const nanoid_1 = require("nanoid");
const loginRouter = (0, express_1.Router)();
loginRouter.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend/login.html"));
});
loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, getUserByEmail_1.getUserByEmail)(email);
        if (user === null)
            return res.json({ message: "Email or password incorrect" }).status(404);
        if ((user === null || user === void 0 ? void 0 : user.password) !== password)
            return res.sendStatus(404);
        const sessionId = (0, nanoid_1.nanoid)();
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
        });
        return res.json({ message: "estas logueado" });
    }
    catch (error) {
        res.sendStatus(404);
    }
}));
exports.default = loginRouter;
//# sourceMappingURL=login.js.map