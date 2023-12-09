/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { deleteProfileAndPosts } from '../../api/mergedData';

export default function ProfileViewCard({ profileObj }) {
  const router = useRouter();
  const deleteProfilePrompt = () => {
    if (window.confirm('Delete Your Profile?')) {
      deleteProfileAndPosts(profileObj.firebaseKey).then(() => {
        router.push('/profile/profiles');
      });
    }
  };
  const { user } = useAuth();
  const { firebaseKey } = router.query;
  const isCurrentUserProfile = user.uid === profileObj.uid;
  if (isCurrentUserProfile) {
    return (
      <div id="profile-view">
        <div className="mt-5 d-flex flex-wrap">
          <div className="d-flex flex-column">
            <img src={profileObj.image} alt={profileObj.name} style={{ width: '300px' }} />
          </div>
          <div className="text-black ms-5 details">
            <h1>{profileObj.name}</h1>
            <h5>
              <ul>Specialty Style: {profileObj.style}</ul>
              <ul>Typical Rates: {profileObj.rates}</ul>
              <ul>Years of Experience {profileObj.experience}</ul>
            </h5>
            <ul>
              About Me:
              <br />
              {profileObj.bio}
            </ul>
            <ul>
              <Button className="button" variant="dark" onClick={deleteProfilePrompt}> Delete Profile </Button><a href={`/profile/update-profile/${firebaseKey}`}><Button className="button" variant="dark"> Edit Profile </Button></a>
            </ul>
            <br />
          </div>
        </div>
        <hr
          style={{
            backgroundColor: 'black',
            color: 'black',
            borderColor: 'black',
            height: '2px',
          }}
        />
      </div>
    );
  }
  return (
    <div id="profile-view">
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img id="profile-view-img" src={profileObj.image} alt={profileObj.name} />
        </div>
        <div className="text-white ms-5 details">
          <h1 className="PV-h1">{profileObj.name}</h1>
          <h5>
            <ul>Specialty Style: {profileObj.style}</ul>
            <ul>Typical Rates: {profileObj.rates}</ul>
            <ul>Years of Experience {profileObj.experience}</ul>
          </h5>
          <ul>
            About Me:
            <br />
            {profileObj.bio}
          </ul>
          <ul>
            <a href={`mailto:${profileObj.email}`}>
              <Button variant="dark">Commission Me</Button>
            </a>
          </ul>
          <br />
        </div>
      </div>
      <hr
        style={{
          backgroundColor: 'black',
          color: 'black',
          borderColor: 'black',
          height: '2px',
        }}
      />
    </div>
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
