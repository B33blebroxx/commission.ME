import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createProfile, updateProfile } from '../../api/profileData';

const initialState = {
  name: '',
  experience: '',
  rates: '',
  style: '',
  image: '',
  bio: '',
};

export default function CreateProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);// If theprofile already exists, fill in the form fields with profile data
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

    if (obj.firebaseKey) {
      updateProfile(formInput).then(() => router.push('/profile/profiles'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProfile(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateProfile(patchPayload).then(() => {
          router.push('/profile/profiles');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <h2 className="text-center mt-4">
        {obj.firebaseKey ? 'Update' : 'Create'} Profile
      </h2>
      <FloatingLabel controlId="floatingInput3" label="Artist Name" className="mb-3">
        <Form.Control
          type="text"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Form.Group className="mb-3 mt-3">
        <FloatingLabel controlId="floatingInput1" label="Link to Profile Picture" className="mb-3 f-w f-c">
          <Form.Control
            type="text"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3 mt-3">
        <FloatingLabel controlId="floatingInput1" label="Email Address" className="mb-3 f-w f-c">
          <Form.Control
            type="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <FloatingLabel controlId="floatingSelect" label="Rates" className="mb-3 f-w f-c">
        <Form.Select
          aria-label="Rates"
          name="rates"
          onChange={handleChange}
          className="mb-3"
          value={formInput.rates}
          required
        >
          <option>Select Rate Range</option>
          <option value="$50-100">$50-100</option>
          <option value="$100-200">$100-200</option>
          <option value="$200-300">$200-300</option>
          <option value="$300+">$300+</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Style" className="mb-3 f-w f-c">
        <Form.Select
          aria-label="Style"
          name="style"
          onChange={handleChange}
          className="mb-3"
          value={formInput.style}
          required
        >
          <option>Select Specialty Style</option>
          <option value="Landscapes">Landscapes</option>
          <option value="Portraits">Portraits</option>
          <option value="Commercial">Commercial</option>
          <option value="Photorealism">Photorealism</option>
          <option value="Surrealism">Surrealism</option>
          <option value="Pop">Pop</option>
          <option value="Abstract">Abstract</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Experience" className="mb-3 f-w f-c">
        <Form.Select
          aria-label="Experience"
          name="experience"
          onChange={handleChange}
          className="mb-3"
          value={formInput.experience}
          required
        >
          <option>Select Experience Range</option>
          <option value="1-2 Years">1-2 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="6-9 Years">6-9 Years</option>
          <option value="10+ Years">10+ Years</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Artist Bio" className="mb-3 f-w f-c">
        <Form.Control
          type="text"
          name="bio"
          value={formInput.bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Form.Group className="text-center">
        <Button className="btn-success" type="submit">
          {obj.firebaseKey ? 'Update' : 'Create'} Profile
        </Button>
      </Form.Group>
    </Form>
  );
}

CreateProfileForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    rates: PropTypes.string,
    image: PropTypes.string,
    experience: PropTypes.string,
    bio: PropTypes.string,
    style: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CreateProfileForm.defaultProps = {
  obj: initialState,
};
