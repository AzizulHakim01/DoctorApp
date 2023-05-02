import React from 'react';
import '../styles/RegisterStyles.css'
import {Form, Input, message} from 'antd'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {showLoading, hideLoading} from '../redux/features/alertSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Form Handler
  const onFinishHandler = async (values) => {
      try {
        dispatch(showLoading())
        const res = await axios.post("http://localhost:8080/api/v1/user/login", values)
        window.location.reload()
        dispatch(hideLoading())
        if(res.data.success){
            localStorage.setItem('token', res.data.token)
            message.success("Login Success")
            navigate("/")
        }
        else{
            message.error(res.data.message)
        }
      } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error("Something Went Wrong")
      }
  }

  return (
    <>
            <div className="form-container">
                <h1>Login Form</h1>
                <Form layout='vertical'
                    onFinish={onFinishHandler}
                    className='card p-5'>
                    <Form.Item label='Email'
                        name={"email"}>
                        <Input type='email' placeholder='Enter your email'/>
                    </Form.Item>
                    <Form.Item label='Password'
                        name={"password"}>
                        <Input type='password' placeholder='Enter your password'/>
                    </Form.Item>
                    <button type='submit' className='btn btn-primary'>
                        Log In
                    </button><br />
                    <h6>Don't have an account? <Link to="/register">Register</Link> here</h6>
                </Form>
            </div>
        </>
  )
}

export default Login