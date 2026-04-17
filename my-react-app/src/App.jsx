import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${skip}`
      );
      const data = await response.json();

      setUsers(prev => [...prev, ...data.users]);
      setSkip(prev => prev + 10);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Profiles</h1>

      <div id="user-list-container">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <img src={user.image} alt={user.firstName} />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
        ))}
      </div>

      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

export default App;