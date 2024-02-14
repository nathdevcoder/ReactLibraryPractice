import { isEmail, isIn, isLength } from "validator"

export default function validateLogin(data: Partial<Record<"email" | "role" | "password", unknown>>): data is validCredentialsType {
 
  const { email, password, role } = data
  const validRoles = ["ADMIN", "MEMBER", "STAFF", "USER"] as RoleType[]

  return (
    typeof email === "string" &&
    isEmail(email) &&
    typeof password === "string" &&
    isLength(password, { min: 6 }) &&
    typeof role === "string" &&
    isIn(role, validRoles)
  )
}
