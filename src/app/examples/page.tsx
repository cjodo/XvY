import { Graph } from "../_components/Graph/Graph"

export default function ExamplePage() {
  const topTenContributors = [
    'c9s',
    'fabpot',
    'weierophinney',
    'dcramer',
    'jeromeetienne' ,
  ]

  return (
    <>
      <h2 className="w-full text-center">Because of the GitHub API Rate limit, this page will be buggy :( Working on it</h2>
      <div>
      { topTenContributors.map((user) => {
        return <Graph withAuth={false} passedUsername={user}/>
      })
      }
      </div>
    </>
  )
}
