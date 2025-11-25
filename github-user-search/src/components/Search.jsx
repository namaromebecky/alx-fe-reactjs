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

  const handleAdvancedSearch = async (e, page = 1) => {
    e?.preventDefault();
    
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setSearchType('basic')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            searchType === 'basic'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Basic Search
        </button>
        <button
          onClick={() => setSearchType('advanced')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            searchType === 'advanced'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Advanced Search
        </button>
      </div>

      {searchType === 'basic' && (
        <form onSubmit={handleBasicSearch} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={basicUsername}
              onChange={(e) => setBasicUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {searchType === 'advanced' && (
        <form onSubmit={handleAdvancedSearch} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={advancedParams.username}
                onChange={(e) => handleAdvancedParamChange('username', e.target.value)}
                placeholder="Username contains..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={advancedParams.location}
                onChange={(e) => handleAdvancedParamChange('location', e.target.value)}
                placeholder="User location..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Repositories
              </label>
              <input
                type="number"
                value={advancedParams.minRepos}
                onChange={(e) => handleAdvancedParamChange('minRepos', e.target.value)}
                placeholder="Minimum repos..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Language
              </label>
              <input
                type="text"
                value={advancedParams.language}
                onChange={(e) => handleAdvancedParamChange('language', e.target.value)}
                placeholder="Primary language..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Searching...' : 'Search Users'}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-medium">Looks like we cant find the user</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {userData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <div className="flex items-start space-x-6">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-24 h-24 rounded-full border-4 border-gray-100"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {userData.name || userData.login}
              </h2>
              <p className="text-gray-600 mb-4">{userData.bio || 'No bio available'}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Followers</p>
                  <p className="text-lg font-semibold text-gray-900">{userData.followers}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Following</p>
                  <p className="text-lg font-semibold text-gray-900">{userData.following}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Repositories</p>
                  <p className="text-lg font-semibold text-gray-900">{userData.public_repos}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg font-semibold text-gray-900">{userData.location || 'Not specified'}</p>
                </div>
              </div>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Search Results ({totalResults} users found)
            </h3>
          </div>
          <div className="grid gap-4">
            {searchResults.map((user, index) => (
              <UserCard key={`${user.id}-${index}`} user={user} />
            ))}
          </div>
          {hasNextPage && (
            <div className="text-center mt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border">
      <div className="flex items-start space-x-6">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-20 h-20 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{user.login}</h4>
              {userDetails && userDetails.name && (
                <p className="text-lg text-gray-600 font-medium mt-1">{userDetails.name}</p>
              )}
            </div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              View Profile
            </a>
          </div>
          
          {userDetails && (
            <div className="mt-4 space-y-3">
              {userDetails.bio && (
                <p className="text-gray-600">{userDetails.bio}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {userDetails.location && (
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-md font-semibold text-gray-900">📍 {userDetails.location}</p>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-sm text-gray-500">Followers</p>
                  <p className="text-md font-semibold text-gray-900">👥 {userDetails.followers}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Following</p>
                  <p className="text-md font-semibold text-gray-900">🔄 {userDetails.following}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Repositories</p>
                  <p className="text-md font-semibold text-gray-900">📚 {userDetails.public_repos}</p>
                </div>
              </div>
            </div>
          )}
          
          {loading && (
            <div className="mt-4 text-center">
              <p className="text-gray-500">Loading user details...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
