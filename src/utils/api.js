/*eslint linebreak-style: ["error", "windows"]*/

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // ========== Auth ==========
  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const { status, message } = await response.json();
    if (status !== 'success') throw new Error(message);
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') throw new Error(message);
    return data.token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') throw new Error(message);
    return data.user;
  }
  // ========== Users ==========
  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const { status, message, data } = await response.json();

    if (status !== 'success') throw new Error(message);
    return data.users;
  }

  // ========== Threads ==========
  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const { status, message, data } = await response.json();

    if (status !== 'success') throw new Error(message);
    return data.threads;
  }

  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const { status, message, data } = await response.json();

    if (status !== 'success') throw new Error(message);
    return data.detailThread;
  }

  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const { status, message, data } = await response.json();
    if (status !== 'success') throw new Error(message);
    return data.thread;
  }

  // ========== Votes ==========
  async function upvoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
    });

    const { status, message } = await response.json();
    if (status !== 'success') throw new Error(message);
  }

  async function downvoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
    });

    const { status, message } = await response.json();
    if (status !== 'success') throw new Error(message);
  }

  async function neutralizeVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });

    const { status, message } = await response.json();
    if (status !== 'success') throw new Error(message);
  }

  // ========== Comments ==========
  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    const { status, message, data } = await response.json();
    if (status !== 'success') throw new Error(message);
    return data.comment;
  }

  async function upvoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
    });

    const { status, message } = await response.json();
    if (status !== 'success') throw new Error(message);
  }

  async function downvoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
    });

    const { status, message } = await response.json();
    if (status !== 'success') throw new Error(message);
  }

  async function neutralizeVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
    });

    const { status, message } = await response.json();
    if (status !== 'success') throw new Error(message);
  }

  // ========== Leaderboards ==========
  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const { status, message, data } = await response.json();

    if (status !== 'success') throw new Error(message);
    return data.leaderboards;
  }

  // ========== Export All ==========
  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    getAllThreads,
    getThreadDetail,
    createThread,
    upvoteThread,
    downvoteThread,
    neutralizeVoteThread,
    createComment,
    upvoteComment,
    downvoteComment,
    neutralizeVoteComment,
    getLeaderboards,
  };
})();

export default api;