import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type CommentProps = {
  id: string;
  content: string;
  author: {
    name: string;
    email: string;
  } | null;
  publication: string;
  authorId: string;
  postId: string;
};

const Comment: React.FC<{ comment: CommentProps }> = ({ comment }) => {
    const authorName = comment.author ? comment.author.name : "Unknown author";
  return (
    <div>
      <h2>{comment.author.name}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={comment.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Comment;
