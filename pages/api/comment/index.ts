// pages/api/comment/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/comment
// Optional fields in body: content
export default async function handle(req, res) {
  const { content,id } = req.body;
  const session = await getSession({ req });
  const result = await prisma.comment.create({
    data: {
      content: content,
      author: { connect: { email: session?.user?.email } },
      publication : {connect : {id:id}}
    },
  });
  res.json(result);
} 