import { useState, useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import Error from './Error'
import blogService from '../services/blog'
import { useSelector } from 'react-redux'

const BlogPost = () => {
    const [blog, setBlog] = useState()
    const loggedUser = useSelector(({ login }) => login)
    const { blogId } = useParams()

    useEffect(() => {
        blogService
            .getSpecificPost(blogId, (loggedUser && loggedUser.token))
            .then(currentBlog => setBlog(currentBlog))
            .catch(() => setBlog(null))
    }, [loggedUser])

    useEffect(() => {
        if(blog) document.title = `Qwale Corporate | ${blog.title || "untitled blog post"}`
    }, [blog])

    if(!blog) return <Error />

    return(
        <>
            <Outlet context={{blog, loggedUser, setBlog}} />
        </>
    )
}

export default BlogPost