// profileData.js

import { getAllPostsByProfile, deletePost } from './postData'; // Import the necessary functions
import { deleteProfile, getAllProfiles } from './profileData';

const deleteProfileAndPosts = (firebaseKey) => new Promise((resolve, reject) => {
  getAllPostsByProfile(firebaseKey)// Gets all posts by profile firebasekey
    .then((posts) => {
      const deletePostPromises = posts.map((post) => deletePost(post.firebaseKey));// Maps through the profile's posts and deletes each
      return Promise.all(deletePostPromises);// Waits for deletePostPromises to finish
    })
    .then(() => deleteProfile(firebaseKey))// Deletes the profile
    .then(resolve)
    .catch(reject);
});

const searchProfiles = (searchValue, firebaseKey) => new Promise((resolve, reject) => {
  getAllProfiles(firebaseKey).then((profileArray) => {
    const searchResults = profileArray.filter((profile) => (
      profile.name.toLowerCase().includes(searchValue)
      || profile.style.toLowerCase().includes(searchValue)
      || profile.rates.toLowerCase().includes(searchValue)

    ));
    resolve(searchResults);
  }).catch(reject);
});

export { deleteProfileAndPosts, searchProfiles };
