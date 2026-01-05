import type { Request, Response, NextFunction } from "express";
import jwt, {type JwtPayload as BaseJwtPayload } from "jsonwebtoken";

interface AuthPayload extends BaseJwtPayload {
    userId: number;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token tidak ditemukan" });
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
        return res.status(401).json({ error: "Format token tidak valid" });
    }

    const secret = process.env.SECRET_KEY;
    if (!secret) {
        throw new Error("SECRET_KEY belum diset");
    }

    try {
        const decoded = jwt.verify(token, secret) as AuthPayload;

        if (!decoded.userId) {
            return res.status(401).json({ error: "Token tidak valid" });
        }

        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({ error: "Token tidak valid atau kadaluarsa" });
    }
};