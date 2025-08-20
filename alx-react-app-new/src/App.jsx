import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App" style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <Header />
      <MainContent />

      <section style={{ marginTop: 24 }}>
        <h2>Example User Profiles</h2>
        <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
        <UserProfile name="Bob" age={30} bio="Frontend dev and coffee addict" />
        <UserProfile name="Charlie" age={28} bio="Enjoys travelling and building side projects" />
      </section>

      <Footer />
    </div>
  );
}

export default App;