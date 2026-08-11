import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import Loading from "../components/Loading";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleCreateUser = async (userData) => {
    try {
      setError("");

      const newUser = await createUser(userData);

     
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          ...newUser,
          id: newUser.id || Date.now(),
        },
      ]);

      alert("User created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      setError("");

      const updatedUser = await updateUser(
        selectedUser.id,
        userData
      );

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...updatedUser,
                id: selectedUser.id,
              }
            : user
        )
      );

      setSelectedUser(null);

      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update user.");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteUser(id);

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
      );

      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
    }
  };

  const handleFormSubmit = (userData) => {
    if (selectedUser) {
      handleUpdateUser(userData);
    } else {
      handleCreateUser(userData);
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">User Management</h1>

        <p className="text-muted">
          React CRUD application using JSONPlaceholder API
        </p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <UserForm
        selectedUser={selectedUser}
        onSubmit={handleFormSubmit}
        onCancel={() => setSelectedUser(null)}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Users</h3>

            <span className="badge bg-primary">
              Total: {users.length}
            </span>
          </div>

          <UserTable
            users={users}
            onEdit={setSelectedUser}
            onDelete={handleDeleteUser}
          />
        </>
      )}
    </div>
  );
}

export default Home;