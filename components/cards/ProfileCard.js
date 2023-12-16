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
    <Card id="profile-card">
      <Card.Img id="profile-card-img" variant="top" src={profileObj.image} />
      <Card.Body>
        <Card.Title id="pc-title">{profileObj.name}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="profile-card-list-group">Specialty Style: {profileObj.style}</ListGroup.Item>
          <ListGroup.Item className="profile-card-list-group">Typical Rates: {profileObj.rates}</ListGroup.Item>
          <ListGroup.Item className="profile-card-list-group">Years of Experience: {profileObj.experience}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer id="profile-card-footer">
        {isCurrentUserProfile && (<><Button className="button" variant="dark" onClick={deleteProfilePrompt}> Delete Profile </Button><a href={`/profile/update-profile/${profileObj.firebaseKey}`}><Button className="button" variant="dark"> Edit Profile </Button></a></>)}
        <Link href={`/profile/${profileObj.firebaseKey}`} passHref><Button className="button" variant="dark">View Profile</Button></Link>
      </Card.Footer>
    </Card>
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
