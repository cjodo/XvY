import { User } from '@clerk/nextjs/server'

interface GithubUserData {
  items: {
    [ login:string, ]
  }
}

interface GitEvent {
	id: string,
	type: "PushEvent" | "IssuesEvent" | "WatchEvent",
	actor: string,
  repo: {
    name:string
  },
}

interface GitRepoData {
  id: string,
  name: string,
  full_name: string,
  owner : {
    login: string
  }
}

interface CommitData {
  name:string,
  amount: number
}

export {
  User as ClerkUserData,
  GithubUserData,
  GitEvent,
  GitRepoData,
  CommitData
}
