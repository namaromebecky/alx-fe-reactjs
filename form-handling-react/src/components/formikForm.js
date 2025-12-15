import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required('Username required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password required')
  });

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <Field name="username" placeholder="Username" />
          <ErrorMessage name="username" />
        </div>
        <div>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikForm;
