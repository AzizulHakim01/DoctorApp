import React from 'react'
import Layout from './Layout'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'

const NotificationPage = () => {
    const {user} = useSelector(state => state.user)
    const handleMarkAllRead = () =>{

    }
    const handleDeleteAllRead = () =>{

    }
  return (
    <Layout>
        
    </Layout>
  )
}

export default NotificationPage