import { useNavigate, useOutletContext, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
const proseStyles = [
    "prose-h1:md:text-6xl prose-h1:sm:text-5xl prose-h1:text-4xl",
    "prose-h2:md:text-5xl prose-h2:sm:text-4xl prose-h2:text-3xl",
    "prose-h3:md:text-4xl prose-h3:sm:text-3xl prose-h3:text-2xl",
    "prose-h4:md:text-3xl prose-h4:sm:text-2xl prose-h4:text-1xl",
    "prose-h5:md:text-2xl prose-h5:sm:text-xl prose-h5:text-lg",
    "prose-h6:md:text-xl prose-h6:sm:text-base prose-h6:text-base",
    "prose-headings:font-inter prose-headings:text-card-foreground prose-headings:mt-10 prose-headings:mb-4",
    "prose-a:text-blue-600 prose-a:after:content-['_↗'] prose-a:font-inter prose-a:underline",
    "prose-blockquote:border-l-4 prose-blockquote:border-card-foreground prose-blockquote:text-muted-foreground prose-blockquote:bg-primary-foreground prose-blockquote:my-2 prose-blockquote:p-4",
    "prose-ul:list-disc prose-ul:pl-8",
    "prose-ol:list-decimal prose-ol:pl-8",
    "prose-pre:rounded-sm prose-pre:bg-muted prose-pre:px-1 prose-pre:my-2",
    "prose-code:bg-muted prose-code:text-muted-foreground prose-code:rounded-sm prose-code:text-wrap prose-code:break-all",
    "prose-p:mt-2 prose-p:text-sm sm:prose-p:text-base",
    "prose-hr:mt-4 prose-hr:mb-2",
    "text-wrap break-words"
]

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import teamService from '@/services/team'
import { Separator } from '@/components/ui/separator'

const BlogPostView = () => {
    const {blog, loggedUser} = useOutletContext()
    const navigate = useNavigate()

    const team = useSelector(({team}) => team)
    const curuser = (loggedUser && [...team].find(t => t.username === loggedUser.username)) || null
    const currentMember = curuser && (curuser.positions.some(p => !p.end) || curuser.board.some(p => !p.end))

    const publishDate = blog && blog.publishDate && new Date(blog.publishDate)
    const updateDate = blog && blog.updateDate && new Date(blog.updateDate)
    
    return(
        <>
            <div className="h-full pt-20 min-h-[calc(100vh-2.5rem)]">
            
                <div className="flex flex-col pt-24 md:pt-64 sm:pt-52">
                    <div className={`${(loggedUser && (loggedUser.username === blog.user.username || loggedUser.admin) && currentMember) ? "flex" : "hidden"} flex-row justify-center`}>
                        <Button className="mx-1" onClick={() => navigate(`/blog/${blog.id}/edit`)}>Edit Blog</Button>
                    </div>
                    <Card className="m-4 sm:px-10 py-8 sm:py-16">
                        <CardContent>
                            <h1 className="md:text-6xl sm:text-5xl text-4xl font-inter">{(blog && blog.title) || "untitled blog post"}{!blog.approved && <span className="text-muted-foreground"> (draft)</span>}</h1>
                            <CardDescription>
                                <div className="flex flex-row mt-1">
                                    <Link className="flex flex-row mt-1 hover:underline" to={`/team/${blog.user.username}`} >
                                        <Avatar className="flex flex-col w-10 h-10 ml-1">
                                            <AvatarImage src={(blog.user.img && teamService.getImg(blog.user.username)) || `https://api.dicebear.com/7.x/lorelei/svg?seed=${blog.user.username}&backgroundColor=e0e0e0`} />
                                            <AvatarFallback>{blog.user.name.match(/\w+/g).map(s => s[0]).join('').toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <p className="my-auto ml-2" >{blog.user.name}</p>
                                    </Link>
                                </div>
                            </CardDescription>
                            <CardDescription className="mt-2">{(publishDate && `Published ${publishDate.toLocaleDateString()}`) || "Unpublished"}</CardDescription>
                            <CardDescription className={updateDate && ((publishDate && updateDate > publishDate) || (blog && !blog.approved)) || "hidden"}>{(updateDate && `Last Edited ${updateDate.toLocaleDateString()}`) || "Unknown"}</CardDescription>
                            <Separator className="my-4" />
                            <ReactMarkdown className={proseStyles.join(' ')} components={{img:({node,...props})=><img style={{maxWidth:'100%', maxHeight: '30rem'}} className="rounded-xl mx-auto my-8" {...props}/>}} >
                                { (blog && blog.content) || ""}
                            </ReactMarkdown>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default BlogPostView