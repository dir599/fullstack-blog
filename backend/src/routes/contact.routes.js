import Router from "express"
import { createContact, deleteContact, getContact, getContactById } from "../controllers/contact.controller.js"

const router = new Router()
router.post("/createContact", createContact)
router.get("/get", getContact)
router.get("/get/:id", getContactById)
router.delete("/delete/:id", deleteContact)

export default router