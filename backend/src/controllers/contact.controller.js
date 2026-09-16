import {
  createContactService,
  getContactService,
} from "../services/contact.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const contact = await createContactService({ name, email, subject, message });
  return res.status(201).json({
    success: true,
    message: "Contact created Successfully.",
    data: contact,
  });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await getContactService();
  return res.status(200).json({
    success: true,
    message: "Blog data:",
    data: contact,
  });
});

export { createContact, getContact };
