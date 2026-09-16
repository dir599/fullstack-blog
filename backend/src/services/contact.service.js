import prisma from "../db/prisma.js";

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

export { createContactService, getContactService };
