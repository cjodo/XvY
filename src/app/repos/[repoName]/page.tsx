
export default function Page ({params}: {params: {repoName: string} }) {
		return <h1>Repo info for {params.repoName}</h1>
}
