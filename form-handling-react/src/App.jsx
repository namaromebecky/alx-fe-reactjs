import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Form Handling in React</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
        <RegistrationForm />
        <FormikForm />
      </div>
    </div>
  );
}

export default App;
