/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleProfile } from '../../api/profileData';

export default function ViewProfile() {
  const [profileDetails, setProfileDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getProfile = () => {
    getSingleProfile(firebaseKey).then(setProfileDetails);
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={profileDetails.image} alt={profileDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h1>{profileDetails?.name}</h1>
          <h5>
            <ul>Specialty Style: {profileDetails.style}</ul>
            <ul>Typical Rates: {profileDetails.rates}</ul>
            <ul>Years of Experience {profileDetails.experience}</ul>
          </h5>
          <ul>
            About Me:
            <br />
            {profileDetails.bio}
          </ul>
          <ul>
            <a href={`mailto:${profileDetails.email}`}>
              <Button variant="info">Contact Me For Commissions</Button>
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
          height: '4px',
        }}
      />
    </div>
  );
}
