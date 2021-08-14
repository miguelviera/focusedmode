import React, {useState} from 'react'
import auth from './../auth/auth-helper'
import {signin} from './api-auth.js'
import {useHistory} from 'react-router-dom'
import {useAppContext} from '../Context'


import './Signin.css';

export default function Signin() {
  const {  isAuthenticated, userHasAuthenticated } = useAppContext();
  const jwt = auth.isAuthenticated()
  let history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  })

  const clickSubmit = (event) => {
    event.preventDefault()
    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }
    const login = false
    fetch(
      "https://focusedmode-1ee71-default-rtdb.firebaseio.com/users.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const key in data) {
          const user = {
            id: key,
            ...data[key]
          };
          if(user.email===values.email && user.password===values.password){
            userHasAuthenticated(true)
            auth.authenticate(key)
            history.push('/')
          }
        }
        setValues({...values, error:'Please, insert the right email and password'})
      })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
      <div className="Signin">
        <form className="form-signin" onSubmit={clickSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
          <input type="email" id="email" className="form-control" placeholder="Email" 
           value={values.email} onChange={handleChange('email')}
            required autoFocus 
          />
          <input type="password" id="password" className="form-control" 
            value={values.password} onChange={handleChange('password')}
            placeholder="Password" required 
          />
          <br/> {
            values.error && (
              <p>{values.error}</p>
            )}
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
}
