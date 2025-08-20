import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';

function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <Header />
      <MainContent />

      <section>
        <h2>Profiles</h2>
        <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
        <UserProfile name="Bob" age={30} bio="Frontend dev and coffee addict" />
      </section>

      <section>
        <h2>Counter Example</h2>
        <Counter />
      </section>

      <Footer />
    </div>
  );
}

export default App;