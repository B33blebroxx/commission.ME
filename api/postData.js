import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllPostsByProfile = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts.json?orderBy="profileId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getPublicPostsByProfile = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts.json?orderBy="profileId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const filteredPosts = Object.values(data).filter((post) => post.private === false);
      resolve(filteredPosts);
    })
    .catch(reject);
});

const getSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deletePost = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllPostsByProfile, getSinglePost, updatePost, deletePost, createPost, getPublicPostsByProfile,
};
