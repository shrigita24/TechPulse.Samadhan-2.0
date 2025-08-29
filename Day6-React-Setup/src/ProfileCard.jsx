function ProfileCard({ name, bio, image }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "20px",
        margin: "15px",
        maxWidth: "250px",
        display: "inline-block",
        background: "white",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          marginBottom: "15px",
        }}
      />
      <h2 style={{ margin: "10px 0", color: "black" }}>{name}</h2>
      <p style={{ color: "black" }}>{bio}</p>
    </div>
  );
}

export default ProfileCard;
