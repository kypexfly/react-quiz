import { Icons } from "./Icons"
import Paper from "./ui/Paper"

const Navbar = () => {
  return (
    <header className="my-4">
      <Paper className="custom-container flex items-center justify-between">
        <h1 className="flex items-center gap-2 font-bold">
          <Icons.logo /> Eazy Quiz
        </h1>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
      </Paper>
    </header>
  )
}

export default Navbar
