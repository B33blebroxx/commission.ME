/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { deleteProfileAndPosts } from '../../api/mergedData';

export default function ProfileViewCard({ profileObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;
  const isCurrentUserProfile = user.uid === profileObj.uid;
  const deleteProfilePrompt = () => {
    if (window.confirm('Delete Your Profile?')) {
      deleteProfileAndPosts(profileObj.firebaseKey).then(() => {
        router.push('/profile/profiles');
      });
    }
  };
  if (isCurrentUserProfile) {
    return (
      <Card id="profile-view">
        <Card.Header className="PV-h1">{profileObj.name}</Card.Header>
        <Card.Body>
          <Card.Img id="profile-view-img" src={profileObj.image} alt={profileObj.name} />
          <ListGroup id="pv-listgroup">Specialty Style: {profileObj.style}</ListGroup>
          <ListGroup id="pv-listgroup">Typical Rates: {profileObj.rates}</ListGroup>
          <ListGroup id="pv-listgroup">Years of Experience: {profileObj.experience}</ListGroup>
          <div id="bio">About Me: <br /> {profileObj.bio}</div>
        </Card.Body>
        <Card.Footer id="pv-footer">
          <Button className="button" variant="dark" onClick={deleteProfilePrompt}> Delete Profile </Button><a href={`/profile/update-profile/${firebaseKey}`}><Button className="button" variant="dark"> Edit Profile </Button></a>
        </Card.Footer>
      </Card>

    );
  }
  return (
    <Card id="profile-view">
      <Card.Header className="PV-h1">{profileObj.name}</Card.Header>
      <Card.Body>
        <Card.Img id="profile-view-img" src={profileObj.image} alt={profileObj.name} />
        <ListGroup id="pv-listgroup">Specialty Style: {profileObj.style}</ListGroup>
        <ListGroup id="pv-listgroup">Typical Rates: {profileObj.rates}</ListGroup>
        <ListGroup id="pv-listgroup">Years of Experience: {profileObj.experience}</ListGroup>
        <div id="bio">About Me: <br /> {profileObj.bio}</div>
      </Card.Body>
      <Card.Footer id="pv-footer">
        <a href={`mailto:${profileObj.email}`}>
          <Button variant="dark">Commission Me</Button>
        </a>
      </Card.Footer>
    </Card>
  );
}

ProfileViewCard.propTypes = {
  profileObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.string,
    rates: PropTypes.string,
    experience: PropTypes.string,
    uid: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
