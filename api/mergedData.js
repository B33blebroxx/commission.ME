// profileData.js

import { getAllPostsByProfile, deletePost } from './postData'; // Import the necessary functions
import { deleteProfile } from './profileData';

const deleteProfileAndPosts = (firebaseKey) => new Promise((resolve, reject) => {
  getAllPostsByProfile(firebaseKey)
    .then((posts) => {
      const deletePostPromises = posts.map((post) => deletePost(post.firebaseKey));
      return Promise.all(deletePostPromises);
    })
    .then(() => deleteProfile(firebaseKey))
    .then(resolve)
    .catch(reject);
});

export default deleteProfileAndPosts;
