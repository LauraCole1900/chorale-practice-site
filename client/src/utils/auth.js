import decode from 'jwt-decode';

class AuthService {

  // GET user data
  getProfile() {
    return decode(this.getToken());
  };

  // Check whether user is logged in:
  // Check for a saved token and that it's still valid
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  // Check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  // GET user token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  };

  // POST user token to localStorage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/members");
  };

  // DELETE user token and profile data from localStorage,
  // then reload the page and reset the state of the application
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  };
};

export default new AuthService();
