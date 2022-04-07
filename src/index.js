import { createRoot } from "react-dom/client"
import "./styles.css"
import App from "./App"

const el = document.getElementById("root")
const root = createRoot(el)

root.render(<App />)
