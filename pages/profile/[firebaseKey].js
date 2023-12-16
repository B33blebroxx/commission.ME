/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAllPostsByProfile, getPublicPostsByProfile } from '../../api/postData';
import { getProfileDetails } from '../../api/profileData';
import ProfileViewCard from '../../components/cards/ProfileViewCard';
import PostCard from '../../components/cards/PostCard';

export default function ViewProfile() {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const isCurrentUserProfile = user.uid === profile.uid;

  const getPosts = () => {
    if (isCurrentUserProfile) {
      getAllPostsByProfile(firebaseKey).then(setPosts);
    } else {
      getPublicPostsByProfile(firebaseKey).then(setPosts);
    }
  };
  useEffect(() => {
    getProfileDetails(firebaseKey).then(setProfile);
    getPosts(firebaseKey);
  }, [profile.firebaseKey]);

  return (
    <>
      <div id="profile-view-container">
        <ProfileViewCard profileObj={profile} onUpdate={setProfile} />
      </div>
      <hr
        style={{
          backgroundColor: 'black',
          color: 'black',
          borderColor: 'black',
          height: '1px',
        }}
      />
      <div id="create-btn">{isCurrentUserProfile && (
        <Link passHref href={`/posts/new/${firebaseKey}`}>
          <Button variant="dark">Create Post</Button>
        </Link>
      )}
      </div>
      <div id="post-container">
        {posts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </>
  );
}
