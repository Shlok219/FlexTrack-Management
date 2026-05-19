export const authUtils = {
  login: (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('flextrack_users') || '[]');
    return users.some((u: any) => u.email === email && u.password === password);
  },

  signup: (email: string, password: string, businessName: string): boolean => {
    const users = JSON.parse(localStorage.getItem('flextrack_users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      businessName,
      currency: 'INR',
    };
    users.push(newUser);
    localStorage.setItem('flextrack_users', JSON.stringify(users));
    localStorage.setItem('flextrack_currentUser', JSON.stringify(newUser));
    return true;
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('flextrack_currentUser') || 'null');
  },

  logout: () => {
    localStorage.removeItem('flextrack_currentUser');
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem('flextrack_currentUser') !== null;
  },
};
