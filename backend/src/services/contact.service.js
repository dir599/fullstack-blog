import prisma from "../db/prisma.js";
import ApiError from "../utils/apiError.js";

const createContactService = async ({ name, email, subject, message }) => {
  if (!name?.trim()) {
    throw new Error(400, "name is required");
  }
  if (!email?.trim()) {
    throw new Error(400, "Email is required");
  }
  if (!subject?.trim()) {
    throw new Error(400, "Subject is required");
  }
  if (!message?.trim()) {
    throw new Error(400, "Message is required");
  }
  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });
  return contact;
};

const getContactService = async () => {
  return await prisma.contact.findMany({
    select: {
      name: true,
      email: true,
      subject: true,
      message: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
};

const getContactServiceById = async ({ id }) => {
  if (isNaN(id)) {
    throw new Error(400, "Id is not valid");
  }
  await prisma.contact.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      name: true,
      email: true,
      subject: true,
      message: true,
    },
  });
};
const deleteContactService = async ({ id }) => {
  if (isNaN(id)) {
    throw new ApiError(400, "Id is not valid");
  }
  const contact = await prisma.contact.findUnique({
    where: { id: Number(id) },
  });
  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }
  const deletedContact = await prisma.contact.delete({
    where: { id: Number(id) },
  });
  return deletedContact;
};

export {
  createContactService,
  getContactService,
  getContactServiceById,
  deleteContactService,
};
