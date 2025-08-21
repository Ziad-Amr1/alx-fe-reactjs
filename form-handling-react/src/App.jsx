import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto space-y-12">
        <RegistrationForm />
        <FormikForm />
      </div>
    </div>
  );
}

export default App;