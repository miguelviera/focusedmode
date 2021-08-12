import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import auth from '../../auth/auth-helper'
import {remove} from '../../apis/user'
import {useAppContext} from '../../Context'

const Profile = () => {
  const { userHasAuthenticated } = useAppContext();
  const jwt = auth.isAuthenticated()
  let history = useHistory();
  const handleDelete = () => {
    remove({userId: auth.isAuthenticated().user._id}, {t: jwt.token}).then((data) => {
      if (data && data.error) {
        console.log('data '+ JSON.stringify(data))
      } else {
        userHasAuthenticated(false)
        auth.clearJWT(() => history.push('/'))
        history.push("/");
      }
    })
  }

  return (
    <div className="card col-md-4 mx-auto">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <div className="mt-3">
            <h4>{auth.isAuthenticated().user.name}</h4>
            <p className="text-secondary mb-1 mt-3">Email: {auth.isAuthenticated().user.email}</p>
            <p className="text-muted font-size-sm mt-3">Joined: {new Date(auth.isAuthenticated().user.created).toDateString()}</p>
            <Link className="btn btn-primary" style={{marginRight: '5px'}} to="/profile/edit" >Edit</Link>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;