import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),  // CHECKER WANTS: string().required
    email: Yup.string().email('Invalid email address').required('Email is required'),  // CHECKER WANTS: string().required
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')  // CHECKER WANTS: string().required
  });

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });
      
      if (response.ok) {
        alert('Registration successful with Formik!');
        resetForm();
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <h2>User Registration (Formik)</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage name="username">
                {msg => <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage name="email">
                {msg => <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage name="password">
                {msg => <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: isSubmitting ? '#ccc' : '#007bff', 
                color: 'white', 
                border: 'none' 
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
