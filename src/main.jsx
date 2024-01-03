import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About, Contact, Login, MyAccount, ResetPassword, Signup, Theme } from './pages/Global'
import { Result, History, EnrollGame } from './pages/Participant'
import { StudentsEnrolled } from './pages/Instructor'
import { Courses } from './pages/Admin'
import { AuthLayout } from './components/index.js'
import { InventoryManagement, SeatingAllocation } from './games/index.js'
import App from './App.jsx'
import store from './store/store.js'
import { Home } from './roles/index.js'

const router = createBrowserRouter(

    createRoutesFromElements(

        <Route path='/' element={<App />} >

            <Route path='' element={<AuthLayout authentication> {""} <Home /> </AuthLayout>} />

            <Route path='admin/instructor/courses/*' element={<Courses />} />

            <Route path='about' element={<About />} />

            <Route path='contact' element={<Contact />} />

            <Route path='my-account' element={<AuthLayout authentication> {""} <MyAccount /> </AuthLayout>} />

            <Route path='inventory-management'>

                <Route index={true} element={<AuthLayout authentication> {""} <InventoryManagement /> </AuthLayout>}/>

                <Route path='result' element={<AuthLayout authentication> {""} <Result /> </AuthLayout>} />

            </Route>

            <Route path='seating-allocation'>

                <Route index={true} element={<AuthLayout authentication> {""} <SeatingAllocation /> </AuthLayout>}/>

                <Route path='result' element={<AuthLayout authentication> {""} <Result /> </AuthLayout>} />

            </Route>

            <Route path='enroll'>

                <Route index={true} element={<AuthLayout authentication> {""} <EnrollGame /> </AuthLayout>}/>

            </Route>

            <Route path='course/students-enrolled'>

                <Route index={true} element={<AuthLayout authentication> {""} <StudentsEnrolled /> </AuthLayout>}/>

            </Route>

            <Route path='course/students-enrolled' element={<AuthLayout authentication> {""} <StudentsEnrolled /> </AuthLayout>} />

            <Route path='theme' element={<AuthLayout authentication> {""} <Theme /> </AuthLayout>} />

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
