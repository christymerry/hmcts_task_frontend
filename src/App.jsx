import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomeScreen from './pages/homeScreen/homeScreen'
import TaskDetails from './pages/taskDetails/taskDetails'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/:id" element={<TaskDetails/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
