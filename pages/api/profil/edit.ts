import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    const result = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    if (!result) {
      throw new Error("no user match email");
    }
    const user = await prisma.user.update({
      where: { id: result.id },
      data: {
        email: req.body.email || result.email,
        name: req.body.name || result.name,
      },
    });
    res.json(user);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
