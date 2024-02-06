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
    if (!url) return null;
    const response = await fetch(url, options);
    if (!response.ok) throw Error;
    const data = await response.json();
    console.log(data);
    if(data.error) return null
    return data.login;
  } catch (error) {
    return null;
  }
}