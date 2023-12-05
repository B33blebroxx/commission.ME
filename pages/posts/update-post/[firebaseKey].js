import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CreatePostForm from '../../../components/forms/CreatePostForm';
import { getSinglePost } from '../../../api/postData';

export default function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditPost);
  }, [firebaseKey]);

  return (<CreatePostForm postObj={editPost} />);
}
