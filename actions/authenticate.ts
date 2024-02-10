export default async function authenticate({email, password, role}: {email:string, password: string, role: string}) {
  const headers = {
    "content-type": "application/json",
  };
  const graphqlQuery = {
    operationName: "Login",
    query: `
        mutation Login($input: LoginInput) {
          login(input: $input) {
            accessToken
            refreshToken
            role
            roles
            dateCreated
            description
            avatar
            email
            name
            id
            csrfToken
          }
        }
    `,
    variables: {
      input: {
        email ,
        password ,
        role ,
      },
    },
  };

  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(graphqlQuery),
  };

  try {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!url) throw Error
    const response = await fetch(url, options);
    if (!response.ok) throw Error;
    const {data, errors} = await response.json(); 
    if(errors) throw new Error(errors[0]?.message)
    return data.login as {}
  } catch (error: any) {
    console.log(error.message); 
    return null;
  }
}
