import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteProfile } from '../../api/profileData';
import { useAuth } from '../../utils/context/authContext';

export default function ProfileCard({ profileObj, onUpdate }) {
  const deleteProfilePrompt = () => {
    if (window.confirm('Delete Your Profile?')) {
      deleteProfile(profileObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const isCurrentUserProfile = user.uid === profileObj.uid;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} id="profile-card-div">
      <Card id="profile-card" style={{ width: '18rem' }}>
        <Card.Img id="profile-card-img" variant="top" src={profileObj.image} />
        <Card.Body>
          <Card.Title>{profileObj.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Specialty Style: {profileObj.style}</ListGroup.Item>
          <ListGroup.Item>Typical Rates: {profileObj.rates}</ListGroup.Item>
          <ListGroup.Item>Years of Experience: {profileObj.experience}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {isCurrentUserProfile && (<Button variant="danger" onClick={deleteProfilePrompt}> Delete Profile </Button>)}
          <Link href={`/profile/${profileObj.firebaseKey}`} passHref><Button variant="info">View Profile</Button></Link>
        </Card.Body>
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {
  profileObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.string,
    rates: PropTypes.string,
    experience: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
