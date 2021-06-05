export const Spinner = () => (
  <div
    style={{
      textAlign: "center",
      margin: "200px auto  ",
      width: "100%",
      height: "100vh",
    }}
  >
    <div className="spinner-border text-primary " role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
