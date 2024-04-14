import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import BlogDetails from './BlogDetails'
import Error from './Error'

import blogService from '@/services/blog'

const BlogList = () => {
    const loggedUser = useSelector(({ login }) => login)
    const blogs = useSelector(({ blog }) => blog.owned)
    const team = useSelector(({ team }) => team)
    const navigate = useNavigate()
    const { toast } = useToast()

    useEffect(() => {
        if(loggedUser) document.title = "Qwale Corporate | Blog Drafts"
    }, [loggedUser])

    const isEmployed = (user) => {
        return (user.positions && user.positions.some(p => !p.end)) || (user.board && user.board.some(p => !p.end))
    }

    const createNewBlog = () => {
        blogService
            .createPost({ title: "untitled blog post", content: "" })
            .then(b => {
                toast({
                    title: "Created blog post",
                    description: "Successfully created new blog post.",
                })
                navigate(`/blog/${b.id}/edit`)
            }).catch(err => {
                toast({
                    title: "An error occurred",
                    description: "An error occurred while creating a new blog post.",
                })
            })
    }

    if(!loggedUser) return <Error/>

    return(
        <>
            <div className="my-auto">
                <div className="flex flex-col mt-20">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-outfit font-semibold text-center mb-4 sm:mt-12 mx-4">Your Drafts</h2>
                </div>

                <div className={`${loggedUser ? "flex" : "hidden"} flex-row justify-center mb-10`}>
                    {loggedUser && team.find(t => t.username == loggedUser.username) && isEmployed(team.find(t => t.username == loggedUser.username)) && <Button className="mx-1" onClick={createNewBlog}>New Blog Post</Button>}
                    <Button className="mx-1" onClick={() => navigate(`/team`)}>Home</Button>
                </div>
                
                {(blogs && blogs.length) ? blogs.filter(b => !b.approved).map(b => <BlogDetails key={b.id} blog={b} /> ) : null}
            </div>
        </>
    )
}

export default BlogList