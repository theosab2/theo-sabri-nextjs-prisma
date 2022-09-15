// Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
  router.pathname === pathname;

  const { data: session, status } = useSession();
  console.log(useSession())
  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
          Flux
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
          font-size: 15px;
          border: 1px #000 solid;
            padding:10px;
            border-radius:5px;
          }
          a:hover {
            background-color:#000;
            color:#fff;
          }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Flux
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            font-size: 15px;
            border: 1px #000 solid;
            padding:10px;
            border-radius:5px;
          }
          a:hover {
            background-color:#000;
            color:#fff;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validatinon de session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Connexion</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            font-size: 15px;
            border: 1px #000 solid;
            padding:10px;
            border-radius:5px;
          }
          a:hover {
            background-color:#000;
            color:#fff;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Flux
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive('/drafts')}>Mes brouillons</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            font-size: 15px;
            border: 1px #000 solid;
            padding:10px;
            border-radius:5px;
          }
          a:hover {
            background-color:#000;
            color:#fff;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a>Nouveaux posts</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Déconnexion</a>
        </button>
        <Link href="/profil">
          <button>
            <a>Profil</a>
          </button>
        </Link>
        <style jsx>{`
          Link{
            font:20;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            font-size: 17px;
            border: 1px #000 solid;
            padding:10px;
            border-radius:5px;
          }

          a:hover {
            background-color:#000;
            color:#fff;
          }

          p {
            display: inline-block;
            font-size: 15px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
            
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            margin: 5px
          }

          button:hover {
            background-color:#000;
            color:#fff;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
