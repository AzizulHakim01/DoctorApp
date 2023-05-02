import React from 'react'
import Layout from '../components/Layout'
import {Col, Form, Input, Row, TimePicker, message} from 'antd'
import { Link } from 'react-router-dom'
import  {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'

const ApplyDoctor = () => {
    const {user} = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinishHandler = async (values) =>{ 
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:8080/api/v1/user/apply-doctor", {...values, userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }})
                dispatch(hideLoading())
                if(res.data.success){
                    message.success("Applied Successfully")
                    navigate('/')
                }else{
                    message.error(res.data.success)
                }
            }
         catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong')
        }
    }
    
  return (
    <Layout>
        <div className="text-center p-4">
                <h2>APPLY DOCTOR FORM</h2>
                <Form layout='vertical'
                    onFinish={onFinishHandler} className='m-4' style={{fontWeight:700}}>
                        <h6 className='text-primary' style={{ fontSize:"2rem"}}>Personal details</h6>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="First Name" name={"firstName"} required rules={[{required:true}]} >
                                <Input type="text" placeholder='Enter your First Name' id='firstName' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Last Name" name={"lastName"} required rules={[{required:true}]}>
                                <Input type="text" placeholder='Enter your Last Name' id='lastName' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Phone Number" name={"phone"} required rules={[{required:true}]}>
                                <Input type="text" placeholder='Enter your Phone Number' id='phone' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Email" name={"email"} required rules={[{required:true}]}>
                                <Input type="email" placeholder='Enter your Email' id='email' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Password" name={"password"} required rules={[{required:true}]}>
                                <Input type="password" placeholder='Enter your password' id='password' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Website" name={"website"}>
                                <Input type="text" placeholder='Enter your website' id='website' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Address" name={"address"} required rules={[{required:true}]}>
                                <Input type="text" placeholder='Enter your Clinic address' id='address' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <h6 className='text-primary' style={{ fontSize:"2rem"}}>Professional details</h6>
                    <Row gutter={20} >
                        <Col xs={24} md={24} lg={8} >
                            <Form.Item label="Specialization" name={"specialization"} required rules={[{required:true}]}>
                                <Input type="text" placeholder='Enter your Specialization' id='specialization' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Experience" name={"experience"} required rules={[{required:true}]}>
                                <Input type="text" placeholder='Enter your work experience' id='experience' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Fees" name={"fees"} required rules={[{required:true}]}>
                                <Input type="text" placeholder='Enter your Phone Number' id='fees' style={{ fontSize:"1.4rem"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Time Available" name={"timing"} required rules={[{required:true}]} >
                                <TimePicker.RangePicker className='m-0' style={{ fontSize:"2rem", float:"left"}}/>
                            </Form.Item>
                        </Col>
                       
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit" style={{fontSize:"1.5rem", fontWeight:700, width:"200px"}}>Apply</button>
                    </div>
                </Form>
            </div>
    </Layout>
  )
}

export default ApplyDoctor