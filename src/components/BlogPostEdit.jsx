import { useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useSelector, useDispatch } from 'react-redux'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Error from "./Error"
import AlertButton from '@/components/AlertButton'
import { useToast } from '@/components/ui/use-toast'

import blogService from '@/services/blog'
import { setOwned } from '@/reducers/blogReducer'

const BlogPostEdit = () => {
    const {blog, setBlog, loggedUser} = useOutletContext()
    const { toast } = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [markdown, setMarkdown] = useState(blog && blog.content)
    const handleTextareaChange = (e) => {
        setMarkdown(e.target.value)
    }

    const [blogTitle, setBlogTitle] = useState(blog && blog.title)
    const handleTitleChange = (e) => {
        setBlogTitle(e.target.value)
    }

    const blogDrafts = useSelector(({blog}) => blog.owned)

    const team = useSelector(({team}) => team)
    const curuser = loggedUser && [...team].find(t => t.username === loggedUser.username)
    const currentMember = curuser && (curuser.positions.some(p => !p.end) || curuser.board.some(p => !p.end))

    const saveBlog = () => {
        if(!blog) {
            console.error("Blog post does not exist")
            return
        }

        blogService.updateContent(blog.id, { title: blogTitle || "untitled blog post", content: markdown }).then(b => {
            setBlog({ ...blog, title: b.title, content: b.content })
            toast({
                title: "Saved blog post",
                description: "The blog post was saved.",
            })
            navigate(`/blog/${blog.id}`)
        }).catch(err => {
            toast({
                title: "An error occurred",
                description: "An error occurred while saving the blog post.",
            })
        })
    }

    const publishBlog = () => {
        if(!blog) {
            console.error("Blog post does not exist")
            return
        }

        blogService.updatePost(blog.id, { approved: true }).then(b => {
            setBlog({ ...blog, approved: b.approved })
            toast({
                title: "Published blog post",
                description: "The blog post was published.",
            })
            navigate(`/blog/${blog.id}`)
        }).catch(() => {
            toast({
                title: "An error occurred",
                description: "An error occurred while publishing the blog post.",
            })
        })
    }

    const unpublishBlog = () => {
        if(!blog) {
            console.error("Blog post does not exist")
            return
        }

        blogService.updatePost(blog.id, { approved: false }).then(b => {
            setBlog({ ...blog, approved: b.approved })
            toast({
                title: "Unpublished blog post",
                description: "The blog post was unpublished.",
            })
            navigate(`/blog/${blog.id}`)
        }).catch(() => {
            toast({
                title: "An error occurred",
                description: "An error occurred while unpublishing the blog post.",
            })
        })
    }

    const deleteBlog = () => {
        if(!blog) {
            console.error("Blog post does not exist")
            return
        }

        blogService.deletePost(blog.id).then(() => {
            dispatch(setOwned([...blogDrafts].filter(b => b.id !== blog.id)))
            toast({
                title: "Deleted blog post",
                description: "The blog post was removed.",
            })
            navigate(`/blog/drafts`)
        }).catch(() => {
            toast({
                title: "An error occurred",
                description: "An error occurred while deleting the blog post.",
            })
        })
    }

    useEffect(() => {
        setMarkdown(blog && blog.content)
    }, [blog])

    if(!(loggedUser && (loggedUser.username === blog.user.username || loggedUser.admin) && currentMember)) return <Error />

    return(
        <>
            <div className="h-full pt-20 min-h-[calc(100vh-2.5rem)]">
                <div className="flex flex-col pt-24 md:pt-64 sm:pt-52">
                    <div className="flex flex-row justify-center">
                        <Button className="mx-1" onClick={() => navigate(`/blog/${blog.id}`)}>View Blog</Button>
                        <Button className="mx-1" onClick={saveBlog}>Save Blog</Button>
                        {(loggedUser && loggedUser.admin) && (blog.approved ? <AlertButton className="mx-1" action={unpublishBlog} confirm="Unpublish Blog" description="Are you sure you want to unpublish the blog? You will have to republish it for it to be publicly viewable.">Unpublish Blog</AlertButton> : <Button className="mx-1" onClick={publishBlog}>Publish Blog</Button>)}
                        {loggedUser && (loggedUser.admin || (!blog.approved)) && <AlertButton className="mx-1" action={deleteBlog} confirm="Delete Blog" description="This action cannot be undone. This will permanently delete your blog post from servers.">Delete Blog</AlertButton>}
                    </div>
                    <Card className="m-4 sm:px-10 py-8 sm:py-16">
                        <CardContent>
                            <Input className="md:text-6xl sm:text-5xl text-4xl font-inter h-auto mb-2" placeholder="Blog post title" onChange={handleTitleChange} value={blogTitle} />
                            <Textarea className="min-h-[800px] w-full" placeholder="Type markdown here" onChange={handleTextareaChange} value={markdown} >{blog && blog.content}</Textarea>
                        </CardContent>
                    </Card>
                
                </div>
            </div>
        </>
    )
}

export default BlogPostEdit