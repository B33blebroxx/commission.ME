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
    <>
      <h1 id="profile-pg-header">Artist Profiles</h1><br />
      <div id="profiles-container" className="text-center my-auto">
        {profiles.map((profile) => (
          <ProfileCard key={profile.firebaseKey} profileObj={profile} onUpdate={getAllTheProfiles} />
        ))}
      </div>
    </>
  );
}
