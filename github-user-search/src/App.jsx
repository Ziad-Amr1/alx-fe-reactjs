// src/App.jsx
import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GitHub User Search</h1>
          <p className="text-gray-600">Find GitHub users and explore their profiles</p>
        </header>
        <Search />
      </div>
    </div>
  );
}

export default App;