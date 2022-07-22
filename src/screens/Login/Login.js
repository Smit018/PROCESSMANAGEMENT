import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button, TextField } from '@mui/material';
import { atom, RecoilRoot, useRecoilState } from 'recoil'
import LoadingButton from '@mui/lab/LoadingButton';

import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { userAuthState } from "../../services/recoil.service";
import { post } from "../../services/https.service";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const PWD_REGEX = /.{6,}/g

const Login = () => {
  // DEFAULT VALUES FOR FORM
  const defaultValues = {
    email: {
      value: '',
      error: false,
      regex: EMAIL_REGEX
    },
    password: {
      value: '',
      error: false,
      regex: PWD_REGEX
    },
  };

  // DEFINE STATE VAR FOR FORM VALUES
  const [formValues, setFormValues] = useState(defaultValues)
  const [submitted, setSubmitted] = useState(false)
  const [admin, setMyAdmin] = useRecoilState(userAuthState)
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (e) => {
    // HANDLE INPUT CHANGE
    const { name, value } = e.target;
    const _formValues = { ...formValues }
    _formValues[name]['value'] = value
    setFormValues(_formValues);
  };

  const handleSubmit = async (event) => {
    // FORM SUBMIT FUNCTION
    setLoading(true)
    event.preventDefault();
    const _form = await validateForm(formValues)
    console.log(_form)
    setFormValues(_form)
    setSubmitted(true)
    login(_form.email.value, _form.password.value)
  };

  const login = async (email, password) => {
    const body = { email, password }
    try {
      const response = await post('admins/login', body)
      if (response.statusCode == 200) {
        if (response.data.id) {
          setMyAdmin({
            token: response.data.id,
            name: 'admin',
            userId: response.data.userId
          })
          setLoading(false)
          // LOGIN TO DASHBOARD
        }
        else {
          // FAILED LOGIN ATTEMPT
          setLoading(false)
        }
      }
      else {
        // FAILED LOGIN ATTEMPT
        setLoading(false)
      }
      setSubmitted(true)
    }
    catch (err) {
      setSubmitted(true)
      setLoading(false)
    }
  }

  const validateForm = (_form) => {
    // VALIDATES THE DATA IN FORM
    return new Promise(resolve => {
      const _formKeys = Object.keys(_form)
      for (let index = 0; index < _formKeys.length; index++) {
        const _key = _formKeys[index];
        let pattern = _form[_key]['regex']
        _form[_key]['error'] = !(pattern.test(_form[_key]['value']))
        console.log('Key -->', _key, ' | Value -->', _form[_key]['value'], ' | Test --> ', pattern.test(_form[_key]['value']))
        if (index === _formKeys.length - 1) resolve(_form)
      }
    })
  }

  return (
    <h1 className="h-full bg-slate-200 flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 400 }}>
          <CardHeader
            title="Enter email & password"
          />
          <CardContent>
            <TextField
              fullWidth
              required
              error={formValues.email.error}
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formValues.email.value}
              onChange={handleInputChange}
              helperText={formValues.email.error ? "Email is invalid!" : ""}
            />
            &nbsp;
            <TextField
              fullWidth
              required
              error={formValues.password.error}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formValues.password.value}
              onChange={handleInputChange}
              helperText={formValues.password.error ? "Password is invalid!" : ""}
            />
          </CardContent>
          <CardActions className='flex justify-center items-center'>
            <LoadingButton
              sx={{ minWidth: 200 }}
              loading={loading}
              variant="contained"
              type="submit"
              size="medium">
              Login
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </h1>
  );
}


Login.propTypes = {};

Login.defaultProps = {};

export default Login;
