import React from 'react';
import '../styles/RegisterStyles.css'
import {Form, Input, message} from 'antd'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // Form Handler
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8080/api/v1/user/register', values)
            dispatch(hideLoading())
            if(res.data.success){
                message.success("Register Successfully")
                navigate('/login')
            }
            else{message.error(res.data.message)}
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong')
        }
    }
    return (
        <>
            <div className="form-container">
                <h1>Register Form</h1>
                <Form layout='vertical'
                    onFinish={onFinishHandler}
                    className='card p-5'>
                    <Form.Item label='Name'
                        name={"name"}
                        style={
                            {fontSize: "20px"}
                    }>
                        <Input type='text' placeholder='Enter your name'/>
                    </Form.Item>
                    <Form.Item label='Email'
                        name={"email"}>
                        <Input type='email' placeholder='Enter your email'/>
                    </Form.Item>
                    <Form.Item label='Password'
                        name={"password"}>
                        <Input type='password' placeholder='Enter your password'/>
                    </Form.Item>
                    <button type='submit' className='btn btn-primary'>
                        Register
                    </button><br />
                    <h6>Already have an account? <Link to="/login">Login</Link> here</h6>
                </Form>
            </div>
        </>
    )
}

export default Register
