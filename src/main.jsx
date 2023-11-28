import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About, Contact, Home, MyAccount, Login, Signup, ResetPassword, Result, History } from './pages/index.js'
import { AuthLayout } from './components/index.js'
import { InventoryManagement } from './games/index.js'
import App from './App.jsx'
import store from './store/store.js'

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path='/' element={<App />} >

            <Route path='' element={<Home />} />

            <Route path='about' element={<About />} />

            <Route path='contact' element={<Contact />} />

            <Route path='my-account' element={<AuthLayout authentication> {""} <MyAccount /> </AuthLayout>} />

            <Route path='inventory-management'>

                <Route index={true} element={<AuthLayout authentication> {""} <InventoryManagement /> </AuthLayout>}/>

                <Route path='result' element={<AuthLayout authentication> {""} <Result /> </AuthLayout>} />

            </Route>

            <Route path='history' element={<AuthLayout authentication> {""} <History /> </AuthLayout>} />

            <Route path='login' element={<AuthLayout authentication={false}> <Login /> </AuthLayout>} />
            

            <Route path='signup' element={<AuthLayout authentication={false}> <Signup /> </AuthLayout>} />

            <Route path='reset-password' element={<AuthLayout authentication={false}> <ResetPassword /> </AuthLayout>} />

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
