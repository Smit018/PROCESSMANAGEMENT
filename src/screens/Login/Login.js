import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button, TextField } from '@mui/material';

import PropTypes from 'prop-types';
import styles from './Login.module.css';

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

  const handleInputChange = (e) => {
    // HANDLE INPUT CHANGE
    const { name, value } = e.target;
    const _formValues = { ...formValues }
    _formValues[name]['value'] = value
    setFormValues(_formValues);
  };

  const handleSubmit = async (event) => {
    // FORM SUBMIT FUNCTION
    event.preventDefault();
    const _form = await validateForm(formValues)
    console.log(_form)
    setFormValues(_form)
  };

  const validateForm = (_form) => {
    // VALIDATES THE DATA IN FORM
    return new Promise(resolve => {
      const _formKeys = Object.keys(_form)
      for (let index = 0; index < _formKeys.length; index++) {
        const _key = _formKeys[index];
        let pattern = _form[_key]['regex']
        _form[_key]['error'] = !(pattern.test(_form[_key]['value']))
        console.log('Key -->' , _key, ' | Value -->', _form[_key]['value'], ' | Test --> ', pattern.test(_form[_key]['value']))
        if(index === _formKeys.length - 1) resolve(_form)
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
            <Button sx={{ minWidth: 200 }} variant="contained" type="submit" size="medium">Login</Button>
          </CardActions>
        </Card>
      </form>
    </h1>
  );
}


Login.propTypes = {};

Login.defaultProps = {};

export default Login;
