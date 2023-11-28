import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { deletePost, getAllPosts } from '../../api/postData';

export default function PostCard({ postObj }) {
  const deletePostPrompt = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postObj.firebaseKey).then(getAllPosts);
    }
  };
  const { user } = useAuth();
  const isCurrentUserProfile = user.uid === postObj.uid;

  return (
    <div id="post-card-container">
      <Card id="post-card">
        <Card.Header id="post-header">Title: {postObj.title}</Card.Header>
        <Card.Body>
          <Card.Img id="post-img" src={postObj.postImg} />
          <ListGroup>
            {isCurrentUserProfile && (<><Button variant="danger" onClick={deletePostPrompt}>Delete Post</Button><a href={`/post/update/${postObj.firebaseKey}`}><Button variant="info"> Edit Profile </Button></a></>)}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    postImg: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
