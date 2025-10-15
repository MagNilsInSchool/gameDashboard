import { Router } from "express";
import { getUsers } from "../handlers/usersHandler.ts";

export const usersRoute = Router();

usersRoute.get("/", getUsers);
