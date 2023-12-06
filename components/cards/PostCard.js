import { Button, Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../api/postData';

export default function PostCard({ postObj, onUpdate }) {
  const deletePostPrompt = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postObj.firebaseKey).then(onUpdate);
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
        </Card.Body>
        <Card.Body>
          {isCurrentUserProfile && (
            <>
              <Button variant="dark" onClick={deletePostPrompt}>
                Delete Post
              </Button>
              <a href={`/posts/update-post/${postObj.firebaseKey}`}>
                <Button variant="dark"> Edit Post </Button>
              </a>
            </>
          )}
          {isCurrentUserProfile && postObj.private && (
          <ListGroup>Private Post</ListGroup>
          )}
          {!isCurrentUserProfile && postObj.private && (
          <ListGroup>Private Post</ListGroup>
          )}
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
    private: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
