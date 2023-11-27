import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About, Contact, Home, Layout, InventoryManage, Login, Signup, ResetPassword, Result } from './components/index.js'
import store from './store/store.js'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />} >
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='inventory-management'>
            <Route index={true} element={<InventoryManage />}/>
            <Route path='result' element={<Result />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='reset-password' element={<ResetPassword />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router = {router} />
        </Provider>
    </React.StrictMode>
)
