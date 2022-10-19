import React, { useEffect, useState } from "react";


import { atom, RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'

import styles from './Login.module.css';
import { userAuthState } from "../../services/recoil.service";
import { post } from "../../services/https.service";
import { TextInput, TextInputField, Button, toaster } from "evergreen-ui";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const PWD_REGEX = /.{6,}/g

const Login = () => {

  const navigate = useNavigate()
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
  const [dummy, setDummy] = React.useState('');
  
  const myadmin = useRecoilValue(userAuthState)

  useEffect(() => {
    if(myadmin) {
      if(myadmin.token && myadmin.name && myadmin.userId) {
        console.log(myadmin)
        navigate('/admin')
      }
      else {

        //null
      }
    }
  }, [])

  const handleInputChange = (e) => {
    // HANDLE INPUT CHANGE
    const { name, value } = e.target;
    const _formValues = { ...formValues }
    _formValues[name]['value'] = value
    setFormValues(_formValues);
    console.log(value)
  };

  const handleSubmit = async (event) => {
    // FORM SUBMIT FUNCTION
    setLoading(true)
    event.preventDefault();
    const _form = await validateForm(formValues)
    // console.log(_form)
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
          navigate('/admin/processes')
          setLoading(false)
          // LOGIN TO DASHBOARD
        }
        else {
          // FAILED LOGIN ATTEMPT
          // toaster.danger('invaild login credintials')
          setLoading(false)
        }
      }
      else {
        // FAILED LOGIN ATTEMPT
        // toaster.danger('invaild login credintials')
        toaster.danger(response?.message)

        setLoading(false)

      }
      setSubmitted(true)
    }
    catch (err) {
      setSubmitted(true)
      setLoading(false)
      // toaster.danger('invaild login credintials')

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
        <div className='shadow w-96'>
          <div className='flex justify-between'>
            <div>
              <p>Enter email & password</p>
            </div>
          </div>
          <br></br>
          <div>
            <TextInputField
              required
              error={formValues.email.error.toString()}
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email..."
              value={formValues.email.value}
              onChange={handleInputChange}
              isInvalid={formValues.email.error}
              validationMessage={formValues.email.error ? "Email is invalid!" : null}
            />
            <TextInputField
              required
              error={formValues.password.error.toString()}
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password..."
              value={formValues.password.value}
              onChange={handleInputChange}
              isInvalid={formValues.password.error}
              validationMessage={formValues.password.error ? "Password is invalid!" : null}
            />
          </div>
          <div className='w-full flex justify-center items-center'>
            <Button className="w-40" isLoading={loading} appearance="primary">
              Login
            </Button>
          </div>
        </div>
      </form>
    </h1>
  );
}


Login.propTypes = {};

Login.defaultProps = {};

export default Login;
