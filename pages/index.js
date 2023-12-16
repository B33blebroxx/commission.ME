/* eslint-disable @next/next/no-html-link-for-pages */
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import logo from '../images/commissionMe-logo.png';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <Image src={logo} />
      <p>Click <Link passHref href="/profile/new"><u>here</u></Link> if this is your first visit, or if you have not created a profile!</p>
      <p>Otherwise click a link above or <Button variant="dark" onClick={signOut}>Sign Out</Button> !</p>
    </div>
  );
}

export default Home;
