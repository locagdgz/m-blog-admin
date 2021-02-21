import React from 'react'
import { Redirect } from 'react-router-dom'


const Login = React.lazy(_=> import('../pages/login'))
const AdminIndex = React.lazy(_=> import('../pages/admin-index'))
const AddArticle = React.lazy(_=> import('../pages/add-article'))



const routes = [
    {
        path: "/",
        exact: true,
        render: () => (
            <Redirect to="/login"/>
        )
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/admin",
        component: AdminIndex,
        routes: [
            {
                path:"/admin/add-article",
                exact: true,
                component: AddArticle
            }
        ]
    }
]

export default routes