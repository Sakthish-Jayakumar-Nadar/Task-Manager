import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import AddEdit from './components/AddEdit.jsx'

const appRouter = createBrowserRouter([{
  path:'/',
  element: <App />,
  children:[
    {
      path:'/',
      element: <Home/>
    },
    {
      path:'/add',
      element: <AddEdit/>
    },
    {
      path:'/edit/:id',
      element: <AddEdit/>
    }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
