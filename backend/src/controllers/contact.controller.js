import {
  createContactService,
  deleteContactService,
  getContactService,
} from "../services/contact.service.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";

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

const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.user.params;
  if (!id) {
    throw new apiError(400, "id not found");
  }
  const contact = await getContactById({ id });
  return res.status(200).json({
    success: true,
    message: "id got",
    data: contact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await deleteContactService({ id });
  return res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
    data: contact,
  });
});

export { createContact, getContact, getContactById, deleteContact };
