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
  const isCurrentUserProfile = user.uid === profile.uid;// Checks if current user is viewing profile they created

  const getPosts = () => {
    if (isCurrentUserProfile) {
      getAllPostsByProfile(firebaseKey).then(setPosts);// If user is viewing a profile they created, get both public and private posts.
    } else {
      getPublicPostsByProfile(firebaseKey).then(setPosts);// If user is viewing a profile another user created, get only public posts
    }
  };
  useEffect(() => {
    getProfileDetails(firebaseKey).then(setProfile);// Fetch single profile by fbk and update state
    getPosts(firebaseKey);// Get either public posts or all posts based on profile fbk
  }, [profile.firebaseKey]);// Makes useEffect run when profile.fbk changes

  return (
    <>
      <div id="profile-view-container">
        <ProfileViewCard profileObj={profile} onUpdate={setProfile} />
      </div>
      <div id="create-btn">{isCurrentUserProfile && (
        <Link passHref a href={`/posts/new/${firebaseKey}`}>
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
