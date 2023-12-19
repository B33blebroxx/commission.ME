/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Button, Card, FloatingLabel, Form,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getProfileDetails } from '../../api/profileData';

const initialState = {
  title: '',
  postImg: '',
  private: false,
};

export default function CreatePostForm({ postObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [profileDetails, setProfileDetails] = useState({});
  const router = useRouter();
  const { profileId } = router.query;
  const { user } = useAuth();

  const getProfile = () => {
    getProfileDetails(profileId).then(setProfileDetails);
  };

  useEffect(() => {
    if (postObj.firebaseKey) setFormInput(postObj);
    getProfile();
  }, [postObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postObj.firebaseKey) {
      updatePost(formInput).then(() => router.push(`/profile/${postObj.profileId}`));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        profileId: profileDetails.firebaseKey,
      };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => {
          router.push(`/profile/${profileDetails.firebaseKey}`);
        });
      });
    }
  };

  return (
    <Card className="form-card">
      <Card.Header id="post-header">
        {postObj.firebaseKey ? 'Update' : 'Create'} Post
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>

          <FloatingLabel
            controlId="floatingInput1"
            label="Title of Post"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="title"
              value={formInput.title}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
            label="Post Image URL"
            className="mb-3"
          >
            <Form.Control
              type="url"
              name="postImg"
              value={formInput.postImg}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Form.Check
            className="mb-3"
            type="switch"
            id="private"
            name="private"
            label="Private Post?"
            checked={formInput.private}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                private: e.target.checked,
              }));
            }}
          />
          <Button type="submit">
            {postObj.firebaseKey ? 'Update' : 'Create'} Post
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

CreatePostForm.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    postImg: PropTypes.string,
    sale: PropTypes.bool,
    profileId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CreatePostForm.defaultProps = {
  postObj: initialState,
};
