import React from 'react';
import { useAuth } from '../context/authContext.tsx';
import { useFormik } from 'formik';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';
import { loginValidationSchema } from '../utils/validationSchema.tsx';
import '../App.css';

const Login: React.FC = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      login(values.username);
    },
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <FiLogIn size={32} />
          </div>
          <h2>Welcome to TaskFlow</h2>
          <p>Please sign in to continue</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className={`form-group ${formik.touched.username && formik.errors.username ? 'error' : ''}`}>
            <label htmlFor="username">
              <FiUser className="input-icon" />
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error-message">{formik.errors.username}</div>
            ) : null}
          </div>

          <div className={`form-group ${formik.touched.password && formik.errors.password ? 'error' : ''}`}>
            <label htmlFor="password">
              <FiLock className="input-icon" />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>

          

          <button type="submit" className="login-btn" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default Login;
