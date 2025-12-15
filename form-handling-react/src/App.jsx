import React from 'react';
import ControlledForm from './components/ControlledForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React Form Handling Comparison</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
        <div style={{ flex: '1', minWidth: '400px' }}>
          <ControlledForm />
        </div>
        <div style={{ flex: '1', minWidth: '400px' }}>
          <FormikForm />
        </div>
      </div>
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Comparison Notes:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
          <li><strong>Controlled Components:</strong> Manual state management, custom validation logic, more boilerplate code</li>
          <li><strong>Formik:</strong> Built-in state management, Yup validation integration, less boilerplate code</li>
          <li>Both forms simulate API calls with 1-second delays</li>
          <li>Both include validation for required fields and length requirements</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
