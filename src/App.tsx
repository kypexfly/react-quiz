import { InterfaceSkeleton, Wizard } from "@/components"
import BaseLayout from "@/layouts/BaseLayout"
import "@/styles/globals.css"
import { useQuery } from "@tanstack/react-query"
import type { Question } from "../types"

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

  const steps =
    data &&
    data.map((question) => ({
      title: question[0],
      questions: [question],
    }))

  return (
    <BaseLayout>
      {isLoading ? (
        <InterfaceSkeleton />
      ) : error ? (
        "Something went wrong"
      ) : (
        <Wizard steps={steps!} />
      )}
    </BaseLayout>
  )
}

export default App
