import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getManager = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    console.log("GET /managers/:cognitoId");
    console.log("Received cognitoId:", cognitoId);

    const manager = await prisma.manager.findUnique({
      where: { cognitoId },
    });

    if (manager) {
      console.log("Manager found:", manager);
      res.json(manager);
    } else {
      console.log("Manager not found");
      res.status(404).json({ message: "Manager not found" });
    }
  } catch (error: any) {
    console.error("Error in getManager:", error.message);
    res.status(500).json({ message: `Internal Server Error, ${error.message}` });
  }
};

export const createManager = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("POST /managers");
    console.log("Request body:", req.body);

    const { cognitoId, name, email, phoneNumber } = req.body;

    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });

    console.log("Manager created:", manager);
    res.status(201).json(manager);
  } catch (error: any) {
    console.error("Error in createManager:", error.message);
    res.status(500).json({ message: `Error creating manager, ${error.message}` });
  }
};

export const updateManager = async (req: Request, res: Response):Promise<void>  => {
    try {
        const { cognitoId } = req.params;
        const {  name, email, phoneNumber } = req.body;

        const updateManager = await prisma.manager.update({
            where: { cognitoId },
            data: {
                cognitoId, name, email, phoneNumber,
            },
            
        });

        res.json(updateManager);
        } catch (error: any) {
            res.status(500).json({ message: `Error update manager,  ${error.message}` });
        }
    }
