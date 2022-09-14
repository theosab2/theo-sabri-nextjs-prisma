import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma'

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author:  {
        select:  { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Flux public</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
      main{
        display:flex;
        justify-content:center;
        flex-direction:column;
        align-items: center;
        
      }
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          display:flex;
          justify-content:center;
          width: 30rem;
          border-radius:5px;
        }
        .post:hover {
          box-shadow: 1px 1px 5px #aaa;
          cursor:pointer;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog