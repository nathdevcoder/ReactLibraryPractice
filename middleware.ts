import {auth} from '@/auth'
import { apiAuthPrefix, authRoutes, defaultRedirect, publicRoutes } from './routes'

export default auth( (req) => {
 const { nextUrl } = req
 const isLogedIn = !!req.auth

 const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
 const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
 const isAuthRoute = authRoutes.includes(nextUrl.pathname)

 if(isApiAuthRoute) {
    return 
 }
 if(isAuthRoute) {
    if(isLogedIn) {
      return Response.redirect(new URL(defaultRedirect, nextUrl))
    }
    return 
 }
 if(!isLogedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
 }
 return 
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}