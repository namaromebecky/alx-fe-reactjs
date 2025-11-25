import { fetchUserData } from '../githubService';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn()
}));

import axios from 'axios';

describe('fetchUserData', () => {
  it('should call the correct GitHub API endpoint', async () => {
    const mockUserData = {
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://avatar.url',
      html_url: 'https://github.com/testuser',
      followers: 10,
      following: 5,
      public_repos: 20,
      bio: 'Test bio'
    };

    axios.get.mockResolvedValue({ data: mockUserData });

    await fetchUserData('testuser');

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.github.com/users/testuser'
    );
  });

  it('should handle user not found error', async () => {
    axios.get.mockRejectedValue({
      response: { status: 404 }
    });

    await expect(fetchUserData('nonexistentuser'))
      .rejects
      .toThrow('User not found');
  });

  it('should handle general errors', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    await expect(fetchUserData('testuser'))
      .rejects
      .toThrow('Failed to fetch user data');
  });
});
