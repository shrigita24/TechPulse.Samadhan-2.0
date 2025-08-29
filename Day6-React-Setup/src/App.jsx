import ProfileCard from "./ProfileCard";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "30px", background: "#f8f8f8" }}>
      <h1 style={{ marginBottom: "30px", color: "darkblue" }}>🐾 Cat Profiles</h1>

      <ProfileCard
        name="Mittens"
        bio="Loves sleeping on the couch and chasing butterflies."
        image="https://placekitten.com/200/200"
      />

      <ProfileCard
        name="Whiskers"
        bio="Enjoys tuna treats and sunbathing by the window."
        image="https://placekitten.com/201/200"
      />

      <ProfileCard
        name="Luna"
        bio="Curious little kitty who loves climbing everywhere!"
        image="https://placekitten.com/202/200"
      />
    </div>
  );
}

export default App;
