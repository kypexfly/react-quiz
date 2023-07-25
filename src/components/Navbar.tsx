import { useLocalStorage } from "@mantine/hooks"
import { Icons } from "./Icons"
import { Button } from "./ui/Button"
import Paper from "./ui/Paper"

const Navbar = () => {
  // const [_getter, _setter, removeUserResponses] = useLocalStorage({
  //   key: "userResponses",
  // })

  // const onReset = () => {
  //   removeUserResponses()
  // }

  return (
    <header className="my-4">
      <Paper className="custom-container flex items-center justify-between">
        <h1 className="flex items-center gap-2 font-bold">
          <Icons.logo /> Computer Science Quiz
        </h1>
        {/* TODO: Add reset quiz button */}
        {/* <Button variant="ghost" onClick={onReset}>
          Reset Quiz
        </Button> */}
      </Paper>
    </header>
  )
}

export default Navbar
