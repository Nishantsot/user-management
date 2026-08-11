import { Link } from "react-router-dom";

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>
                <Link
                  to={`/users/${user.id}`}
                  className="text-decoration-none fw-semibold"
                >
                  {user.name}
                </Link>
              </td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>

                  <Link
                    to={`/users/${user.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;