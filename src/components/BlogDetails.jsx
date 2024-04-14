import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import teamService from '../services/team'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'

const BlogDetails = ({ blog }) => {
    return(
        <Card className="mx-4 xl:mx-64 lg:mx-32 md:mx-16 sm:mx-8 mb-8">
            <CardHeader>
                <Link to={`/blog/${blog.id}`} >
                    <CardTitle className="font-outfit">{blog.title || "untitled blog post"}<span className="text-muted-foreground" >{(!blog.approved) && " (draft)"}</span></CardTitle>
                </Link>
                <CardDescription>
                    {(blog.publishDate && `Published ${new Date(blog.publishDate).toLocaleDateString()}`) || "unpublished"}
                    <div className="flex flex-row mt-1">
                        <Link className="flex flex-row mt-1" to={`/team/${blog.user.username}`} >
                            <Avatar className="flex flex-col w-8 h-8 ml-1">
                                <AvatarImage src={(blog.user.img && teamService.getImg(blog.user.username)) || `https://api.dicebear.com/7.x/lorelei/svg?seed=${blog.user.username}&backgroundColor=e0e0e0`} />
                                <AvatarFallback>{blog.user.name.match(/\w+/g).map(s => s[0]).join('').toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <p className="my-auto ml-2 no-underline hover:underline" >{blog.user.name}</p>
                        </Link>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

export default BlogDetails