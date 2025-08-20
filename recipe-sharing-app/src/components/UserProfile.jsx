import React from 'react';
import useRecipeStore from './recipeStore';

const UserProfile = () => {
  const currentUser = useRecipeStore(state => state.currentUser);
  const userPreferences = useRecipeStore(state => state.userPreferences);
  const setCurrentUser = useRecipeStore(state => state.setCurrentUser);
  const logout = useRecipeStore(state => state.logout);

  if (!currentUser) {
    return (
      <div className="user-profile">
        <h3>Select User</h3>
        <div className="user-buttons">
          <button onClick={() => setCurrentUser('user1')} className="user-btn">
            Login as Alice
          </button>
          <button onClick={() => setCurrentUser('user2')} className="user-btn">
            Login as Bob
          </button>
          <button onClick={() => setCurrentUser('user3')} className="user-btn">
            Login as Charlie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h3>Welcome, {currentUser.name}!</h3>
      <div className="user-info">
        <p>Preferences: {userPreferences.join(', ')}</p>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;