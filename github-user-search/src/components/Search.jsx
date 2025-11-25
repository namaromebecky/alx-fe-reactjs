import React, { useState } from 'react';
import { fetchUserData, searchUsers, fetchUserDetails } from '../services/githubService';

const Search = () => {
  const [searchType, setSearchType] = useState('basic');
  const [basicUsername, setBasicUsername] = useState('');
  const [advancedParams, setAdvancedParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: ''
  });
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Basic search handler
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    if (!basicUsername.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults([]);

    try {
      const data = await fetchUserData(basicUsername);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Advanced search handler
  const handleAdvancedSearch = async (e, page = 1) => {
    e?.preventDefault();
    
    // Check if at least one field is filled
    const hasSearchCriteria = Object.values(advancedParams).some(value => value.trim());
    if (!hasSearchCriteria) {
      setError('Please fill at least one search field');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const result = await searchUsers(advancedParams, page);
      setSearchResults(page === 1 ? result.users : [...searchResults, ...result.users]);
      setHasNextPage(result.hasNextPage);
      setTotalResults(result.total_count);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    handleAdvancedSearch(null, currentPage + 1);
  };

  const handleAdvancedParamChange = (field, value) => {
    setAdvancedParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearSearch = () => {
    setBasicUsername('');
    setAdvancedParams({
      username: '',
      location: '',
      minRepos: '',
      language: ''
    });
    setUserData(null);
    setSearchResults([]);
    setError('');
    setTotalResults(0);
  };

  return (
    <div className="search-container">
      {/* Search Type Toggle */}
      <div className="search-type-toggle">
        <button
          onClick={() => setSearchType('basic')}
          className={`toggle-btn ${searchType === 'basic' ? 'active' : ''}`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchType('advanced')}
          className={`toggle-btn ${searchType === 'advanced' ? 'active' : ''}`}
        >
          Advanced Search
        </button>
      </div>

      {/* Basic Search Form */}
      {searchType === 'basic' && (
        <form onSubmit={handleBasicSearch} className="search-form basic-search">
          <div className="form-row">
            <input
              type="text"
              value={basicUsername}
              onChange={(e) => setBasicUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="search-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="search-btn primary"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="search-btn secondary"
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {/* Advanced Search Form */}
      {searchType === 'advanced' && (
        <form onSubmit={handleAdvancedSearch} className="search-form advanced-search">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={advancedParams.username}
                onChange={(e) => handleAdvancedParamChange('username', e.target.value)}
                placeholder="Username contains..."
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                value={advancedParams.location}
                onChange={(e) => handleAdvancedParamChange('location', e.target.value)}
                placeholder="User location..."
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Minimum Repositories</label>
              <input
                type="number"
                value={advancedParams.minRepos}
                onChange={(e) => handleAdvancedParamChange('minRepos', e.target.value)}
                placeholder="Minimum repos..."
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Programming Language</label>
              <input
                type="text"
                value={advancedParams.language}
                onChange={(e) => handleAdvancedParamChange('language', e.target.value)}
                placeholder="Primary language..."
                className="form-input"
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="search-btn primary"
            >
              {loading ? 'Searching...' : 'Search Users'}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="search-btn secondary"
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>Looks like we cant find the user</p>
          <p className="error-detail">{error}</p>
        </div>
      )}

      {/* Single User Result */}
      {userData && (
        <div className="user-card detailed">
          <div className="user-header">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="user-avatar large"
            />
            <div className="user-info">
              <h2 className="user-name">{userData.name || userData.login}</h2>
              <p className="user-bio">{userData.bio || 'No bio available'}</p>
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-label">Followers</span>
                  <span className="stat-value">{userData.followers}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Following</span>
                  <span className="stat-value">{userData.following}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Repositories</span>
                  <span className="stat-value">{userData.public_repos}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Location</span>
                  <span className="stat-value">{userData.location || 'Not specified'}</span>
                </div>
              </div>
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
        </div>
      )}

      {/* Advanced Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h3>Search Results ({totalResults} users found)</h3>
          </div>
          <div className="results-grid">
            {searchResults.map((user, index) => (
              <UserCard key={`${user.id}-${index}`} user={user} />
            ))}
          </div>
          {hasNextPage && (
            <div className="load-more-container">
              <button
                onClick={loadMore}
                disabled={loading}
                className="load-more-btn"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// User Card Component for search results
const UserCard = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    if (userDetails) return;
    
    setLoading(true);
    try {
      const details = await fetchUserDetails(user.login);
      setUserDetails(details);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDetails();
  }, [user.login]);

  return (
    <div className="result-card">
      <div className="card-content">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="card-avatar"
        />
        <div className="card-info">
          <h4 className="card-username">{user.login}</h4>
          {userDetails && (
            <div className="card-details">
              {userDetails.name && (
                <p className="card-name">{userDetails.name}</p>
              )}
              {userDetails.location && (
                <p className="card-location">📍 {userDetails.location}</p>
              )}
              <div className="card-stats">
                <span className="stat-item">👥 {userDetails.followers} followers</span>
                <span className="stat-item">📚 {userDetails.public_repos} repos</span>
              </div>
            </div>
          )}
          {loading && (
            <p className="card-loading">Loading details...</p>
          )}
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default Search;
