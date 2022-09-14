// pages/create.tsx

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useSession,getSession } from 'next-auth/react';

const Draft: React.FC = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const { data: session, status } = useSession();
    console.log(session);

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const body = { name, mail };
          await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          await Router.push('/drafts');
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(()=>{
        setName(session?.user?.name)
        setMail(session?.user?.email)
      },[session])

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>My profil</h1>
          <input
            autoFocus
            placeholder="Pseudo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            autoFocus
            placeholder="Adresse mail"
            type="text"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input type="submit" value="Submit" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
