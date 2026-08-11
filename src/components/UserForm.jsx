import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
};

function UserForm({ selectedUser, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [selectedUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);

    if (!selectedUser) {
      setFormData(initialForm);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4 className="card-title mb-3">
          {selectedUser ? "Edit User" : "Add New User"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>

            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {selectedUser ? "Update User" : "Add User"}
          </button>

          {selectedUser && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserForm;