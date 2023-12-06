import { useEffect, useState } from 'react';
import { getAllProfiles } from '../../api/profileData';
import ProfileCard from '../../components/cards/ProfileCard';

export default function ShowProfiles() {
  const [profiles, setProfiles] = useState([]);

  const getAllTheProfiles = () => {
    getAllProfiles().then(setProfiles);
  };

  useEffect(() => {
    getAllTheProfiles();
  });

  return (
    <div className="text-center my-auto">
      <br /><h1 id="profile-pg-header">Artist Profiles</h1>
      <div className="d-flex flex-wrap">
        {profiles.map((profile) => (
          <ProfileCard key={profile.firebaseKey} profileObj={profile} onUpdate={getAllTheProfiles} />
        ))}
      </div>
    </div>
  );
}
