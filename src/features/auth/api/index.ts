// Mock API functions for authentication
export const signIn = async (email: string, password: string) => {
  // In a real app, this would be an API call
  return {
    user: { id: '1', email, name: 'Test User' },
    token: 'mock-jwt-token'
  };
};

export const signUp = async (email: string, password: string, name: string) => {
  // In a real app, this would be an API call
  return {
    user: { id: '1', email, name },
    token: 'mock-jwt-token'
  };
};

export const getCurrentUser = async (token: string) => {
  // In a real app, this would be an API call with the token
  return { id: '1', email: 'user@example.com', name: 'Test User' };
};