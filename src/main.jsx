import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Homepage from './components/Homepage.jsx'
import Contact from './components/Contact.jsx'
import Error from './components/Error.jsx'
import About from './components/About.jsx'
import Team from './components/Team.jsx'
import MemberPage from './components/MemberPage.jsx'
import LoginForm from './components/LoginForm.jsx'
import ResetForm from './components/ResetForm.jsx'
import BlogPost from './components/BlogPost.jsx'
import DraftBlogList from './components/DraftBlogList.jsx'
import BlogList from './components/BlogList.jsx'
import BlogPostView from './components/BlogPostView.jsx'
import BlogPostEdit from './components/BlogPostEdit.jsx'

import './index.css'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/loginReducer.js'
import teamReducer from './reducers/teamReducer.js'
import blogReducer from './reducers/blogReducer.js'

const store = configureStore({
    reducer: {
        login: loginReducer,
        team: teamReducer,
        blog: blogReducer
    }
})

const Version = () => {
    const date = new Date
    const versionId = "1.0.0"
    return (
        <p className="text-white text-xl" >Version number {versionId}<br/>{date.toUTCString()}<br/>(c) Faraaz Jan</p>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <Navbar><Error/></Navbar>,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "team",
                element: <Team />
            },
            {
                path: "team/login",
                element: <LoginForm />
            },
            {
                path: "team/reset",
                element: <ResetForm />
            },
            {
                path: "team/:memberId",
                element: <MemberPage />
            },
            {
                path: "blog",
                element: <BlogList />
            },
            {
                path: "blog/drafts",
                element: <DraftBlogList />
            },
            {
                path: "blog/:blogId",
                element: <BlogPost />,
                children: [
                    {
                        path: "",
                        element: <BlogPostView />
                    },
                    {
                        path: "edit",
                        element: <BlogPostEdit />
                    }
                ]
            },
            {
                path: ":unknownId",
                element: <Error />
            },
        ]
    },
    {
        path: "/webinfo",
        element: <Version />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)