import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.query.userId as string;
  const files = await prisma.file.findMany({ where: { userId } });
  res.json({ files });
}
