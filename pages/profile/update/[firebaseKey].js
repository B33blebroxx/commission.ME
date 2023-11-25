import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleProfile } from '../../../api/profileData';
import CreateProfileForm from '../../../components/forms/CreateProfileForm';

export default function EditProfile() {
  const [editProfile, setEditProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProfile(firebaseKey).then(setEditProfile);
  }, [firebaseKey]);

  return (<CreateProfileForm obj={editProfile} />);
}
