import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost } from '../../api/postData';
import { getSingleProfile } from '../../api/profileData';

const initialState = {
  title: '',
  postImg: '',
  private: false,
};

export default function CreatePostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [profileDetails, setProfileDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getSingleProfile(obj.firebaseKey).then(setProfileDetails);
    console.warn(profileDetails);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      uid: user.uid,
      profileId: obj.firebaseKey,
    };
    if (obj.firebaseKey) {
      updatePost(formInput).then(() => router.push(`/profile/${obj.firebaseKey}`));
    } else {
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => {
          router.push(`/profile/${obj.firebaseKey}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">
        {obj.firebaseKey ? 'Update' : 'Create'} Post
      </h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Title of Post"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Post Title"
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
          placeholder="Enter Image URL"
          name="postImg"
          value={formInput.postImg}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Form.Check
        className="text-white mb-3"
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
        {obj.firebaseKey ? 'Update' : 'Create'} Post
      </Button>
    </Form>
  );
}

CreatePostForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    postImg: PropTypes.string,
    sale: PropTypes.bool,
    profileId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CreatePostForm.defaultProps = {
  obj: initialState,
};
