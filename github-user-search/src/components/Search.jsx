import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      
      {error && (
        <div className="error">
          <p>Looks like we cant find the user</p>
        </div>
      )}

      {userData && (
        <div className="user-card">
          <img 
            src={userData.avatar_url} 
            alt={`${userData.login}'s avatar`} 
            className="avatar"
          />
          <div className="user-info">
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.bio || 'No bio available'}</p>
            <p>Followers: {userData.followers} | Following: {userData.following}</p>
            <p>Public Repos: {userData.public_repos}</p>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
