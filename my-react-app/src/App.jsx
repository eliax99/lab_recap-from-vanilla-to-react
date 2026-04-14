import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    const res = await fetch(`https://dummyjson.com/users?limit=10&skip=${skip}`);
    const data = await res.json();

    setUsers(prev => [...prev, ...data.users]);
    setSkip(prev => prev + 10);

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <img src={user.image} alt={user.firstName} />
          <h3>{user.firstName} {user.lastName}</h3>
        </div>
      ))}

      <button onClick={fetchUsers}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

export default function App() {
  return <UserList />;
}