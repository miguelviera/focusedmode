import React, {useState, useEffect} from 'react'
import { useHistory} from 'react-router-dom'

import './EditProfile.css';

import {update} from '../../apis/user'

import auth from '../../auth/auth-helper'

const EditProfile = () => {
  const jwt = auth.isAuthenticated()
  let history = useHistory();
  const [values, setValues] = useState({
    name: auth.isAuthenticated().user.name,
    email: auth.isAuthenticated().user.email,
    password: ""
  })

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    update(auth.isAuthenticated().user._id, {t: jwt.token}, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error})
      } else {
        auth.updateUser(data)
        history.push("/profile");
      }
    })
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <div className="card col-md-4 mx-auto">
        <hr className="border-light m-0" />
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" 
              value={values.name} onChange={handleChange('name')}
            />
          </div>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input type="text" className="form-control mb-1" 
              value={values.email} onChange={handleChange('email')}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control mb-1" 
              value={values.password} onChange={handleChange('password')}
              placeholder="Password"
            />
          </div>
          <div className="form-group text-right mt-3">
            <button type="button" className="btn btn-primary" onClick={clickSubmit}>Save changes</button>&nbsp;
            <button type="button" className="btn btn-danger">Cancel</button>
          </div>
        </div>
        {values.error && <p>{values.error}</p>}
    </div>
  );
}

export default EditProfile;