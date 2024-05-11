import { UserProvider } from './contexts/UserContext'
import {AppRoutes} from './routes'
import "./styles/global.css"

function App() {

  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
