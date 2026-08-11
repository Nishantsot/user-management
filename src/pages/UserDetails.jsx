import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/userService";
import Loading from "../components/Loading";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUserById(id);

      setUser(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>

        <Link to="/" className="btn btn-primary">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <Link to="/" className="btn btn-secondary mb-4">
        ← Back to Users
      </Link>

      <div className="card shadow">
        <div className="card-body">

          <h2 className="mb-4">
            User Details
          </h2>

          <p>
            <strong>ID:</strong> {user.id}
          </p>

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Phone:</strong> {user.phone}
          </p>

          <p>
            <strong>Website:</strong> {user.website}
          </p>

          <hr />

          <h5>Address</h5>

          <p>
            <strong>Street:</strong>{" "}
            {user.address.street}
          </p>

          <p>
            <strong>Suite:</strong>{" "}
            {user.address.suite}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {user.address.city}
          </p>

          <p>
            <strong>Zipcode:</strong>{" "}
            {user.address.zipcode}
          </p>

          <hr />

          <h5>Company</h5>

          <p>
            <strong>Company:</strong>{" "}
            {user.company.name}
          </p>

          <p>
            <strong>Catch Phrase:</strong>{" "}
            {user.company.catchPhrase}
          </p>

        </div>
      </div>

    </div>
  );
}

export default UserDetails;