import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

export default function ViewPostCard({ postObj }) {
  const { user } = useAuth();
  const isCurrentUserProfile = user.uid === postObj.uid;

  if (isCurrentUserProfile) {
    return (
      <div id="post-view-container">
        <Card id="post-view-card">
          <Card.Header id="post-view-header">
            Title: {postObj.title}
          </Card.Header>
          <Card.Body>
            <Card.Img id="post-view-image" src={`${postObj.postImg}`} />
          </Card.Body>
        </Card>
      </div>
    );
  }
  return (
    <div id="post-view-container">
      <Card id="post-view-card">
        <Card.Header id="post-view-header">
          Title: {postObj.title}
        </Card.Header>
        <Card.Body>
          <Card.Img id="post-view-image" src={`${postObj.postImg}`} />
        </Card.Body>
      </Card>
    </div>
  );
}

ViewPostCard.propTypes = {
  postObj: PropTypes.shape({
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    postImg: PropTypes.string,
  }).isRequired,
};
