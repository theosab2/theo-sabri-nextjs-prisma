import React,{ FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { CommentProps } from '../../components/Comment';
import Comment from '../../components/Comment';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  const comment = await prisma.comment.findMany({
    where: {
      postId: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  console.log(comment)
  let comments = JSON.parse(JSON.stringify(comment))

  return {
    props: {post, comments},
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

type Props = {
  post : PostProps,
  comments : CommentProps[]
}

const Post: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const [content, setContent] = useState('');
  
  async function publishComment(e:FormEvent): Promise<void> {
    e.preventDefault();
    let id = props.post.id;
    const body = { content,id };
    await fetch(`/api/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setContent("");
    Router.push(`/p/${props.post.id}`)
  }

  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.post.author?.email;
  let title = props.post.title;
  if (!props.post.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div className="test">
        <h2>{title}</h2>
        <p>By {props?.post?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.post.content} />
        {
        !props.post.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.post.id)}>Publish</button>
        )
        }
        {
          userHasValidSession && postBelongsToUser && (
            <button onClick={() => deletePost(props.post.id)}>Delete</button>
          )
        }
        {
          userHasValidSession && props.post.published &&(
            <>
              <button onClick={publishComment}>Comment</button>
              <br></br>
              <input onChange={(e) => setContent(e.target.value)} value={content} type="text"></input>
            </>
          )
        }
        <div>
          {props?.comments?.map((comment) => {
                return <Comment comment={comment}  key={comment.id}/>;
          })}
        </div>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ccc;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }

        .test{
          background : #ddd;
          padding:5px;
        }
      `}</style>
    </Layout>
  );
};

export default Post;


