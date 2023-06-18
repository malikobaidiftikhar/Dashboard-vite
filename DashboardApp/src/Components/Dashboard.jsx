import { SimpleGrid } from '@mantine/core'
import React from 'react'

function Dashboard() {
  return (
    <SimpleGrid className='simplegrid' cols={4} spacing="xs" verticalSpacing="xs">
    <div ><h3>Total users</h3></div>
    <div><h3>Total Orders</h3></div>
    <div><h3>Total Vehicles</h3></div>
    <div><h3>Total Total Payments</h3></div>
    <div><h3>Total Complaints</h3></div>
    <div><h3>Total Reviews</h3></div>
    <div><h3>Total Accounts</h3></div>
    <div><h3>Total Vehicles</h3></div>
    
  </SimpleGrid>
  
  )
}

export default Dashboard