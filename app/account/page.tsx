'use client'
 
import ApplicationTable from '@/components/tables/ApplicationTable'
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import React, { Fragment } from 'react'

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
  const upgradePlan = async (plan: planType) => {
    await update({ plan, type: 'upgrade' })
  }
  const applyRole = async () => {
    await update({ type: 'asign' })
  }
   return <Box > 
    {!plan && session?.user.role === "user" && (
        <Fragment>
          <Typography variant="h5" mb={2}> {plan ? plan + " Member" : "Membership"} </Typography>
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
        </Fragment>
    )}
    <Divider/>
    {isEligibleToApply && <Box textAlign={'right'} py={2}>
        <Typography variant='h6' mb={2}>Application status</Typography>
        {staffStatus ? <Typography>{staffStatus.toUpperCase()}</Typography> :
        <Button variant='outlined' onClick={()=>applyRole()}>Apply for Staff Account</Button>}
    </Box>}
    {session && session.user.role === 'admin' && (
        <ApplicationTable />
    )}
    <Divider/>
    {session && <Button onClick={async () => await signOut()} sx={{my: 2}}>Log out</Button> }
   </Box>
 }
 