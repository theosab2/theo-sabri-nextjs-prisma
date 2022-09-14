// pages/create.tsx

import React, { FormEvent, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useSession } from 'next-auth/react';


const Draft: React.FC = (props) => {
    const { data: session, status } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');

      async function submitData(e: FormEvent): Promise<void> {
        e.preventDefault()
        const res = await fetch(`/api/profil/edit`, {
          method: 'PUT',
          headers: new Headers({"Content-Type":"application/json"}),
          body:JSON.stringify({email,name})
        });
        
      }

      useEffect(()=>{
        setName(session?.user?.name)
        setEmail(session?.user?.email)
      },[session])

  return (
    <Layout>
      <form onSubmit={e=>submitData(e)}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={submitData}>Submit</button>
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
      </form>
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
