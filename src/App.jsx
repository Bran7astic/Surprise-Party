import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './pages/Layout'
import Home from './pages/Home'
import Debug from './pages/Debug'
import GetPokemon from './pages/GetPokemon'
import ViewPokemon from './pages/ViewPokemon'
import Details from './pages/Details'
import Edit from './pages/Edit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="get" element={<GetPokemon/>} />
          <Route path="view" element={<ViewPokemon/>}/>
          <Route path="view/:id" element={<Details/>}/>
          <Route path="view/:id/edit" element={<Edit/>}/>
          <Route path="debug" element={<Debug/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
