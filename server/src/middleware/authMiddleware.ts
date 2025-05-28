import { use } from 'react';
import jwt, { Jwt } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

interface DecodedToken  extends Jwt {
    sub: string;
    "custom:role"?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            }
        }
    }
}

export const authMiddleware = (allowRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        
        try {
            const decoded = jwt.decode(token) as DecodedToken;
            const userRole = decoded["custom:role"] || "";
            req.user = {
                id: decoded.sub,
                role: userRole
            };

            const hasAccess = allowRoles.includes(userRole.toLowerCase());
            if (!hasAccess) {
                res.status(403).json({ message: "Access is Forbidden" });
                return;
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        next();
    }
}