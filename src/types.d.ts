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

export {
  User as ClerkUserData,
  GithubUserData,
  GitEvent
}
