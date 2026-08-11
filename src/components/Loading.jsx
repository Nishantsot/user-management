function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <p className="mt-2">Loading users...</p>
    </div>
  );
}

export default Loading;