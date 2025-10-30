import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../handlers/usersHandler.ts";

export const usersRoute = Router();

usersRoute.get("/", getUsers);
usersRoute.post("/", createUser);

// Param routes.
usersRoute.get("/:id", getUser);
usersRoute.delete("/:id", deleteUser);
usersRoute.put("/:id", updateUser);
