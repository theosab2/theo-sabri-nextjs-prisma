// pages/api/post/[id].ts

import prisma from '../../../lib/prisma';

// UPDATE/api/profil/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === 'UPDATE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
