import { Graph } from "../_components/Graph/Graph"

export default function ExamplePage() {
  const topContributors = [
    'c9s',
    'fabpot',
    'weierophinney',
  ]

  return (
    <>
      <div>
      { topContributors.map((user) => {
        return <Graph key={user} withAuth={false} passedUsername={user}/>
      })
      }
      </div>
    </>
  )
}
