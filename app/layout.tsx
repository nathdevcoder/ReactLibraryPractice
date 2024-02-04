import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import ThemeRegistry from '@/providers/ThemeProvider' 
import ApiProvider from '@/providers/ApiProvider'
import { AppBar, Box, Container, Toolbar,   Typography } from '@mui/material'  
import MenuContainer from '@/components/menuContainer'
import { getServerSession } from 'next-auth'
import authOptions  from '@/utils/AuthOptions'
import Account from '@/components/Account'
import GlobalModals from '@/components/GlobalModals'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'React Practice',
  description: 'Generated by create next app',
}

 
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <ApiProvider session={session}>
        <ThemeRegistry options={{ key: 'mui' }}> 
          <body className={inter.className}> 
            <Typography variant='h3' my={2} textAlign={'center'}>React Library Practice</Typography>
            <AppBar position="static">
              <Toolbar variant="dense">
                <Container maxWidth='xl'>
                   <MenuContainer />
                </Container> 
              </Toolbar>
            </AppBar>
            <Container maxWidth='lg'>
              <Box  my={2} textAlign={'right'}>
                <Account />
              </Box>
              <Box my={4}>
                {children}
              </Box>
            </Container>
            <GlobalModals />
          </body>
        </ThemeRegistry>
      </ApiProvider>
    </html>
  )
}
