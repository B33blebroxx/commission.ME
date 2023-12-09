import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deleteProfileAndPosts } from '../../api/mergedData';

export default function ProfileCard({ profileObj, onUpdate }) {
  const deleteProfilePrompt = () => {
    if (window.confirm('Delete Your Profile?')) {
      deleteProfileAndPosts(profileObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const isCurrentUserProfile = user.uid === profileObj.uid;

  return (
    <div id="profile-card-div">
      <Card id="profile-card">
        <Card.Img id="profile-card-img" variant="top" src={profileObj.image} />
        <Card.Body>
          <Card.Title id="pc-card-title">{profileObj.name}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="profile-card-list-group">Specialty Style: {profileObj.style}</ListGroup.Item>
            <ListGroup.Item className="profile-card-list-group">Typical Rates: {profileObj.rates}</ListGroup.Item>
            <ListGroup.Item className="profile-card-list-group">Years of Experience: {profileObj.experience}</ListGroup.Item>
          </ListGroup>
          {isCurrentUserProfile && (<Button variant="dark" onClick={deleteProfilePrompt}> Delete Profile </Button>)}
          <Link href={`/profile/${profileObj.firebaseKey}`} passHref><Button variant="dark">View Profile</Button></Link>
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
