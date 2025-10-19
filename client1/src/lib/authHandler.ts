import Credentials, { CredentialsConfig } from "next-auth/providers/credentials";

class AuthHandler {
  login(): CredentialsConfig {
    return Credentials({
      id: "graphql-login",
      name: "Graphql Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.USER_PORT}/graphql`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            message
            user {
              email
              username
              token
            }
          }
        }
      `,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
            },
          }),
        });

        const result = await res.json();

        if (result.errors || !result.data?.login?.user) return null;

        const user = result.data.login.user;

        return {
          email: user.email,
          name: user.username,
          accessToken: user.token,
        };
      },
    })
  }
  signup(): CredentialsConfig {
    return Credentials({
      id: "graphql-signup",
      name: "Graphql Signup",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.USER_PORT}/graphql`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
            mutation signup($username: String!
            $email: String!
            $password: String!
            $avatarUrl: String){
        createUser(
            username: $username
            email:$email
            password:$password
            avatarUrl: $avatarUrl
          ) {
            message,
            user{
              email,
              username,
              token
            }
          }
        }
            `,
            variables: {
              username: credentials.username,
              password: credentials.password,
              email: credentials.email,
              avatarUrl: null
            }

          })
        })
        const result = await res.json();
        if (result.errors || !result.data?.createUser?.user) return null;

        const user = result.data.createUser.user;

        return {
          email: user.email,
          name: user.username,
          accessToken: user.token,
        };
      }
    })
  }
}

export default AuthHandler