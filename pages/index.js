/* eslint-disable @next/next/no-html-link-for-pages */
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

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
      <p>Click <a href="/profile/new"><u>here</u></a> if this is your first visit, or if you have not created a profile!</p>
      <p>Otherwise click a link above or <Button variant="danger" onClick={signOut}>Sign Out</Button>!</p>
    </div>
  );
}

export default Home;
