import { User } from '@clerk/nextjs/server'

export interface GithubUserData {
  items: {
    [ login:string, ]
  }
}

export interface GitEvent {
	id: string,
	type: "PushEvent" | "IssuesEvent" | "WatchEvent",
	actor: string,
  repo: {
    name:string
  },
}

export interface GitRepoData {
  id: string,
  name: string,
  full_name: string,
  owner : {
    login: string
  }
}

export interface CommitData {
  name:string,
  amount: number
}

export {
  User as ClerkUserData
}
