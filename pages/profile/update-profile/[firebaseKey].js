import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProfileDetails } from '../../../api/profileData';
import CreateProfileForm from '../../../components/forms/CreateProfileForm';

export default function EditProfile() {
  const [editProfile, setEditProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getProfileDetails(firebaseKey).then(setEditProfile);
  }, [firebaseKey]);

  return (<CreateProfileForm obj={editProfile} />);
}
