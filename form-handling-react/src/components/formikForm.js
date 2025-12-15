import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await mockApiCall(values);
      setStatus({ type: 'success', message: response.message });
      resetForm();
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const mockApiCall = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `User ${data.username} registered successfully with Formik!`
        });
      }, 1000);
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Formik Form Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ccc'
                }}
              />
              <ErrorMessage name="username">
                {msg => <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ccc'
                }}
              />
              <ErrorMessage name="email">
                {msg => <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: '1px solid #ccc'
                }}
              />
              <ErrorMessage name="password">
                {msg => <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{msg}</div>}
              </ErrorMessage>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>

      {status && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: status.type === 'error' ? '#f8d7da' : '#d4edda',
          border: status.type === 'error' ? '1px solid #f5c6cb' : '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default FormikForm;
