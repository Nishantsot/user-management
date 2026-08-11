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

  // =========================
  // FETCH USERS
  // =========================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      // First check localStorage
      const savedUsers = localStorage.getItem("users");

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        // If no saved users, fetch from API
        const data = await getUsers();

        setUsers(data);

        // Save initial users
        localStorage.setItem(
          "users",
          JSON.stringify(data)
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        "Failed to fetch users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE USER
  // =========================
  const handleCreateUser = async (userData) => {
    try {
      setError("");

      // JSONPlaceholder POST is only simulated
      try {
        await createUser(userData);
      } catch (apiError) {
        console.warn(
          "JSONPlaceholder POST failed. Saving locally.",
          apiError
        );
      }

      setUsers((previousUsers) => {
        // Get all existing IDs
        const ids = previousUsers
          .map((user) => Number(user.id))
          .filter((id) => Number.isFinite(id));

        // Generate next ID
        const nextId =
          ids.length > 0
            ? Math.max(...ids) + 1
            : 1;

        // Create user using form data
        const newUser = {
          id: nextId,
          ...userData,
        };

        // Add new user
        const updatedUsers = [
          ...previousUsers,
          newUser,
        ];

        // Save to localStorage
        localStorage.setItem(
          "users",
          JSON.stringify(updatedUsers)
        );

        return updatedUsers;
      });

      alert("User created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
    }
  };

  // =========================
  // UPDATE USER
  // =========================
  const handleUpdateUser = async (userData) => {
    try {
      setError("");

      // Try API update
      try {
        await updateUser(
          selectedUser.id,
          userData
        );
      } catch (apiError) {
        console.warn(
          "JSONPlaceholder PUT failed. Updating locally.",
          apiError
        );
      }

      setUsers((previousUsers) => {
        const updatedUsers = previousUsers.map(
          (user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  ...userData,
                  id: selectedUser.id,
                }
              : user
        );

        // Save updated users
        localStorage.setItem(
          "users",
          JSON.stringify(updatedUsers)
        );

        return updatedUsers;
      });

      setSelectedUser(null);

      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update user.");
    }
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      // Try API delete
      try {
        await deleteUser(id);
      } catch (apiError) {
        console.warn(
          "JSONPlaceholder DELETE failed. Deleting locally.",
          apiError
        );
      }

      setUsers((previousUsers) => {
        const updatedUsers = previousUsers.filter(
          (user) => user.id !== id
        );

        // Save updated users
        localStorage.setItem(
          "users",
          JSON.stringify(updatedUsers)
        );

        return updatedUsers;
      });

      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
    }
  };

  // =========================
  // FORM SUBMIT
  // =========================
  const handleFormSubmit = (userData) => {
    if (selectedUser) {
      handleUpdateUser(userData);
    } else {
      handleCreateUser(userData);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          User Management
        </h1>

        <p className="text-muted">
          React CRUD application using JSONPlaceholder API
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* USER FORM */}
      <UserForm
        selectedUser={selectedUser}
        onSubmit={handleFormSubmit}
        onCancel={() => setSelectedUser(null)}
      />

      {/* USERS */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* USER COUNT */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Users</h3>

            <span className="badge bg-primary">
              Total Users: {users.length}
            </span>
          </div>

          {/* USER TABLE */}
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