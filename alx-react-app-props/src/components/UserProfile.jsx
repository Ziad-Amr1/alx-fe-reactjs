// src/components/UserProfile.jsx
const UserProfile = (props) => {
  return (
    <div className="user-profile" style={{ border: '1px solid #eee', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;