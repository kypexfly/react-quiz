import "@/styles/globals.css"
import { useQuery } from "@tanstack/react-query"
import type { Question } from "../types"
import InterfaceSkeleton from "./components/InterfaceSkeleton"
import Wizard from "./components/Wizard"
import BaseLayout from "./layouts/BaseLayout"

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["questions"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    queryFn: async () => {
      const res = await fetch("/api/questions")
      const data = (await res.json()) as Promise<Question[]>
      return data
    },
  })

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="space-y-4">
          <InterfaceSkeleton />
        </div>
      </BaseLayout>
    )
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="space-y-4">Something went wrong</div>
      </BaseLayout>
    )
  }

  const steps = data!.map((question) => ({
    title: question[0],
    questions: [question],
  }))

  return (
    <BaseLayout>
      <div className="space-y-4">
        <Wizard steps={steps} />
      </div>
    </BaseLayout>
  )
}

export default App
