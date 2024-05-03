import { User } from '@clerk/nextjs/server'

interface GithubUserData {
  items: {
    [ login:string, ]
  }
}

export {
  User as ClerkUserData,
  GithubUserData
}
