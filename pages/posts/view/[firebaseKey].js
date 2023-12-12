import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ViewPostCard from '../../../components/cards/ViewPostCard';
import { getSinglePost } from '../../../api/postData';

export default function ViewPost() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePost(firebaseKey).then(setPost);
  }, []);

  return <ViewPostCard postObj={post} />;
}
