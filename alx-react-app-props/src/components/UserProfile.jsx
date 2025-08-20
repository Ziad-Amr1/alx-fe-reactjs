// src/components/UserProfile.jsx
import React, { useContext } from 'react';
import UserContext from './UserContext'; // تأكد من المسار الصحيح

function UserProfile() {
  const userData = useContext(UserContext); // استخدام الـ Context بدلاً من props

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
      <h2 style={{ color: 'blue' }}>{userData.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}>{userData.age}</span></p>
      <p>Bio: {userData.bio}</p>
    </div>
  );
}

export default UserProfile;