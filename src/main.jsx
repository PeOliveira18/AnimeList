import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Airing from './Pages/airing.jsx'
import Popular from './Pages/popular.jsx'
import Upcoming from './Pages/upcoming.jsx'
import AnimeDetails from './Pages/animeDetails.jsx'
import Genres from './Pages/genres.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/Popular',
    element: <Popular/>
  },
  {
    path: '/Airing',
    element: <Airing/>
  },
  {
    path: '/Upcoming',
    element: <Upcoming/>
  },
  {
    path: '/Genres',
    element: <Genres/>
  },
  {
    path: '/AnimeDetail/:id',
    element: <AnimeDetails/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
