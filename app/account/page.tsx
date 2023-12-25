'use client'
 
import ApplicationTable from '@/components/tables/ApplicationTable'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import React  from 'react'

const membershipData: {name: planType, bgColor: string}[] = [
    {name: 'STANDARD',  bgColor: 'burlywood'},
    {name: 'SILVER',  bgColor: 'silver'},
    {name: 'GOLD',  bgColor: 'gold'}
]
 
 export default function AccountPage() {
  const {data:session, update} = useSession()

  const plan = session?.user.plan 
  const staffStatus = session?.user.staffStatus 
  const isEligibleToApply = session?.user.role === 'user' || session?.user.role === 'member'
  const isEligibleToRegister = !plan && session?.user.role === "user"
  const isAdmin = session && session.user.role === 'admin'
  const title = plan ? plan + " Member" : session?.user.role === 'user' ? "Membership" : "Account"

  const upgradePlan = async (plan: planType) => {
    await update({ plan, type: 'upgrade' })
  }
  const applyRole = async () => {
    await update({ type: 'asign' })
  }

   return ( 
   <Box >  
      <Typography variant="h5" mb={2}>{ title }</Typography> 

      {isEligibleToRegister && (
        <Stack direction={"row"} flexWrap="wrap"  spacing={4} justifyContent={"center"} my={8} >
          {membershipData.map((mdata) => (
            <Paper key={mdata.name} variant="outlined" square={false}>
              <Box width={230} p={4} pb={2} textAlign={"center"}>
                <Typography color={mdata.bgColor} mb={4} fontWeight={"bold"}> {mdata.name} </Typography>
                <Button
                  onClick={() => upgradePlan(mdata.name)}
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: mdata.bgColor, color: "black" }}
                >  Register </Button>
              </Box>
            </Paper>
          ))}
        </Stack> 
      )} 

      <Divider/> 

      {isEligibleToApply && (
        <Box textAlign={'right'} py={2}>
          <Typography variant='h6' mb={2}>Staff Application status</Typography>
          {staffStatus ? <Typography>{staffStatus.toUpperCase()}</Typography> :
          <Button variant='outlined' onClick={()=>applyRole()}>Apply for Staff Account</Button>}
        </Box>
      )} 
      
      {isAdmin && ( <ApplicationTable />  )} 

      <Divider/>
      
      {session && <Button onClick={async () => await signOut()} sx={{my: 2}}>Log out</Button> }
   </Box>
  )
}
 