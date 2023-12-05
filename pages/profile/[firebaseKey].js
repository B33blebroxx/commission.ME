/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
// import { getAllProfiles } from '../../api/profileData';
import { useAuth } from '../../utils/context/authContext';
import { getAllPostsByProfile, getPublicPostsByProfile } from '../../api/postData';
import PostCard from '../../components/cards/PostCard';
import deleteProfileAndPosts from '../../api/mergedData';
import { getProfileDetails } from '../../api/profileData';

export default function ViewProfile() {
  const [profileDetails, setProfileDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();
  const isCurrentUserProfile = user.uid === profileDetails.uid;
  const getProfile = () => {
    getProfileDetails(firebaseKey).then(setProfileDetails);
  };
  const getPosts = () => {
    if (isCurrentUserProfile) {
      getAllPostsByProfile(firebaseKey).then(setPosts);
    } else {
      getPublicPostsByProfile(firebaseKey).then(setPosts);
    }
  };

  useEffect(() => {
    getProfile();
    getPosts();
  }, [firebaseKey, profileDetails.uid]);

  const deleteProfilePrompt = () => {
    if (window.confirm('Delete Your Profile?')) {
      deleteProfileAndPosts(profileDetails.firebaseKey).then(router.push('/profile/profiles'));
    }
  };

  if (isCurrentUserProfile) {
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
            <ul>
              <Button variant="danger" onClick={deleteProfilePrompt}> Delete Profile </Button> <a href={`/profile/update-profile/${firebaseKey}`}><Button variant="info"> Edit Profile </Button></a>
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
        <div id="post-container">
          <Link passHref a href={`/posts/new/${firebaseKey}`}><Button variant="primary">Create Post</Button></Link>
          {posts.map((post) => (
            <PostCard key={post.firebaseKey} postObj={post} onUpdate={getPosts} />
          ))}
        </div>
      </div>
    );
  }
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
          height: '2px',
        }}
      />
      <div id="post-container">
        {posts.map((post) => (
          <PostCard key={post.firebaseKey} postObj={post} onUpdate={getPosts} />
        ))}
      </div>
    </div>
  );
}
