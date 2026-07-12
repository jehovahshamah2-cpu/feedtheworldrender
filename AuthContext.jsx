import { createContext, useContext, useState, useCallback } from 'react';

// AuthContext ya msingi - inatumia Pi Network SDK (window.Pi) kwa sababu
// server/middleware/auth.js inatarajia Pi accessToken (https://api.minepi.com/v2/me)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const login = useCallback(async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      if (!window.Pi) {
        throw new Error('Pi SDK haijapatikana. Fungua app hii kwenye Pi Browser.');
      }
      const scopes = ['username', 'payments'];
      const onIncompletePaymentFound = (payment) => {
        console.log('Incomplete payment found:', payment);
      };
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser({ uid: authResult.user.uid, username: authResult.user.username });
      setAccessToken(authResult.accessToken);
      return authResult;
    } catch (err) {
      setAuthError(err.message || 'Imeshindikana kuingia.');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, authLoading, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
