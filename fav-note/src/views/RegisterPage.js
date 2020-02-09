import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import AuthTemplate from 'templates/AuthTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import { Link, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { register as registerAction } from 'actions';

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 0 0 30px 0;
  height: 40px;
  width: 300px;
  background-color: hsl(0, 0%, 96%);
  color: #333;
`;

const StyledLink = styled(Link)`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
`;

const RegisterPage = ({ redirectToLogin, register }) => (
  <AuthTemplate>
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={({ username, password }) => {
        register(username, password);
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        if (redirectToLogin) {
          return <Redirect to={routes.login} />;
        }

        return (
          <>
            <Heading>Sign in</Heading>
            <StyledForm>
              <StyledInput
                type="text"
                name="username"
                placeholder="Login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <Button activecolor="notes" type="submit">
                register
              </Button>
            </StyledForm>
            <StyledLink to={routes.login}>I want to log in!</StyledLink>
            {/* {redirectToLogin && alert('Registered. Now log in')} */}
          </>
        );
      }}
    </Formik>
  </AuthTemplate>
);

RegisterPage.propTypes = {
  redirectToLogin: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = ({ redirectToLogin = false }) => ({
  redirectToLogin,
});

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(registerAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
