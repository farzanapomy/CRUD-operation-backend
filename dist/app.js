"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
// app.use('/api/v1/users', );
app.get('/', (req, res) => {
    // const a = 10;
    res.status(200).json({ message: 'Here is the real celprite' });
});
exports.default = app;
