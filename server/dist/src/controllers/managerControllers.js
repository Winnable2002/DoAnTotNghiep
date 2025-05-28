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
exports.createManager = exports.getManager = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cognitoId } = req.params;
        console.log("GET /managers/:cognitoId");
        console.log("Received cognitoId:", cognitoId);
        const manager = yield prisma.manager.findUnique({
            where: { cognitoId },
        });
        if (manager) {
            console.log("Manager found:", manager);
            res.json(manager);
        }
        else {
            console.log("Manager not found");
            res.status(404).json({ message: "Manager not found" });
        }
    }
    catch (error) {
        console.error("Error in getManager:", error.message);
        res.status(500).json({ message: `Internal Server Error, ${error.message}` });
    }
});
exports.getManager = getManager;
const createManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("POST /managers");
        console.log("Request body:", req.body);
        const { cognitoId, name, email, phoneNumber } = req.body;
        const manager = yield prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });
        console.log("Manager created:", manager);
        res.status(201).json(manager);
    }
    catch (error) {
        console.error("Error in createManager:", error.message);
        res.status(500).json({ message: `Error creating manager, ${error.message}` });
    }
});
exports.createManager = createManager;
