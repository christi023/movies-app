import { createContext } from 'react';

export default createContext(null);

/*export function UserProvider(props) {
  // user to store 2 things = tokens & user
  const [userData, setUserData] = useState({
    token: undefined, // store token
    user: undefined, // store user data
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('w_auth');
      if (token === null) {
        localStorage.setItem('w_auth', '');
        token = '';
      }
      const tokenRes = await axios.post('http://localhost:5000/api/users/tokenIsValid', null, {
        headers: { 'Set-Cookie': 'w_auth' },
      });
      console.log(tokenRes.data);

      if (tokenRes.data) {
        const userRes = await axios.get('http://localhost:5000/api/users/auth', {
          headers: { 'Set-Cookie': 'w_auth' },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>{props.children}</UserContext.Provider>
  );
}
*/
