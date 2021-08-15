import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {create} from '../../apis/user'

import './Signup.css';

const Signup = () => {
  let history = useHistory();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })
  useEffect(() => {
  }, [])

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const clickSubmit = async (e) => {
    e.preventDefault()
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      pomodoro: {
        'Sunday': 0,
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'date': getDate()
      },
      todos: []
    }
    const response = await create(user)

    history.push('./signin')
  }   

  return (
      <div className="Signup">
        <form className="form-signup text-center" onSubmit={clickSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Sign up</h1>
          <input type="text" id="name" className="form-control resetBottomBorder" 
            value={values.name} onChange={handleChange('name')}
            placeholder="Name" required autoFocus 
          />
          <input type="email" id="email" className="form-control resetBorder" 
            value={values.email} onChange={handleChange('email')}
            placeholder="Email" required autoFocus 
          />
          <input type="password" id="password" className="form-control" 
            value={values.password} onChange={handleChange('password')}
            placeholder="Password" required autoFocus 
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
          {
            values.error && (
            <p className="mt-5 mb-3" style={{color: 'red'}}>{values.error}</p>
          )}
        </form>
      </div>
  );
}

export default Signup;