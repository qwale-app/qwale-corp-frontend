import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useParams, Link } from 'react-router-dom'
import Error from './Error'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'

import UpdateName from "./UpdateName"
import UpdateMisc from "./UpdateMisc"
import UpdateDescr from "./UpdateDescr"
import UpdateSocial from "./UpdateSocial"
import AddPosition from "./AddPosition"
import DeleteButton from "./DeleteButton"
import { QwaleIcon, LinkedinIcon, TwitterIcon, GithubIcon } from "./Icons"
import { useToast } from '@/components/ui/use-toast'

import { setTeam } from "../reducers/teamReducer"
import teamService from '../services/team'

const MemberPage = () => {
    let { memberId } = useParams()
    const currentMember = useSelector(({ team }) => team.find(m => m.username == memberId))

    useEffect(() => {
        if(currentMember) document.title = `Qwale Corporate | ${currentMember.name}`
    }, [currentMember])

    if(!currentMember) {
        return(<Error />)
    }
    

    return(
        <>
            <div className="h-full pt-32 md:pt-48 lg:pt-64 px-2 lg:px-20 xl:px-64 min-h-[calc(100vh-2.5rem)]">
                <TeamCard card={currentMember} />
            </div>
        </>
    )
}

const FileUpload = (props) => {
    const [file, setFile] = useState(null)

    const members = useSelector(({team}) => team)
    const dispatch = useDispatch()

    const { toast } = useToast()

    const fileUploaded = async() => {
        const formData = new FormData();
        if(file.size > 8e6) {
            toast({
                title: "An error occurred",
                description: "Make sure the file uploaded is less than 8 MB.",
            })
            return
        }
        formData.append("image", file);

        teamService.setImg(props.username, formData)
            .then(() => {
                dispatch(setTeam(members.map(m => m.username == props.username ? ({...m, img: true}) : m)))
                toast({
                    title: "Updated Profile Picture",
                    description: "Successfully updated profile picture.",
                })
                props.update()
            }).catch((err) => {
                toast({
                    title: "An error occurred",
                    description: "Something happened while uploading the image.",
                })
            })
        
    }

    const fileClick = async(upload) => {
        if(upload.target.files.length<=0) return
        setFile(upload.target.files[0])
    }

    useEffect(() => {
        if(!file) return;
        fileUploaded()
    }, [file])

    if(!props.edit) return(<>{props.children}</>)
    return(
        <>
            <div onClick={() => document.getElementById('fileid').click()}>{props.children}</div>
            <input id='fileid' accept="image/png, image/jpeg" type='file' name='file' onChange={fileClick} hidden/>
        </>
    )
}

const TeamCard = ({card}) => {
    const [rerender, setRerender] = useState(new Date().getTime())
    const updateRender = () => {
        setRerender(new Date().getTime())
    }

    const {name, description, socials, positions, img, username, board, email, blogs} = card
    const fallback = name.match(/\w+/g).map(s => s[0]).join('').toUpperCase()

    const allowedBlogs = (blogs && blogs.filter(b => b.approved)) || []

    const loggedUser = useSelector(({login}) => login)

    const allPositions = [...((positions || []).concat(board ? board.map(p => ({...p, board: true, position: "Board Member"})) : []))].sort((a, b) => b.start - a.start)
    let mainPosition = "unknown position"
    let searchedPositions = allPositions.filter((p) => !p.end)

    switch(searchedPositions.length) {
    case 0:
        searchedPositions = [...allPositions].sort((a, b) => b.end - a.end)
        searchedPositions = searchedPositions.filter(p => ((p.end.getMonth() === searchedPositions[0].end.getMonth()) && (p.end.getFullYear() === searchedPositions[0].end.getFullYear())))
        if(searchedPositions.length) mainPosition = `Ex-${(searchedPositions.find(p => !p.board).position || searchedPositions[0]).position}`
        break
    case 1:
        mainPosition = searchedPositions[0].position
        break
    default:
        mainPosition = searchedPositions.find(p => !p.board).position || searchedPositions[0].position
    }

    return(
        <Card className="mx-4 mb-8">
            <CardHeader className="flex flex-row">
                <FileUpload edit={loggedUser && (loggedUser.username == username || loggedUser.admin)} username={username} update={updateRender} >
                    <Avatar className={`flex flex-col w-24 h-24 ${(loggedUser && (loggedUser.username == username || loggedUser.admin)) && "hover:opacity-50 transition-opacity cursor-pointer"}`} >
                        <AvatarImage src={(img && `${teamService.getImg(username)}?${rerender}`) || `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}&backgroundColor=e0e0e0`} />
                        <AvatarFallback>{fallback}</AvatarFallback>
                    </Avatar>
                </FileUpload>
                <div className="flex sm:flex-row flex-col w-full">
                    <div className="pl-4 flex flex-col justify-center">
                        <CardTitle>
                            {(loggedUser && (loggedUser.username == username || loggedUser.admin)) ? <UpdateName defaultName={name} username={username}/> : `${name}`}
                        </CardTitle>
                        <CardDescription>{mainPosition}</CardDescription>
                    
                    </div>
                    <div className={`pt-2 ${(loggedUser && (loggedUser.username == username || loggedUser.admin)) ? "hidden" : "flex"} flex-row sm:mr-0 sm:ml-auto sm:py-auto pl-4 sm:pl-0`}>
                        {(socials && socials.qwale) && <Link to={`https://qwale.app/u/${socials.qwale}`} className="sm:mt-3"><QwaleIcon className="h-5 sm:h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1 sm:mr-2" /></Link>}
                        {(socials && socials.twitter) && <Link to={`https://twitter.com/${socials.twitter}`} className="sm:mt-3"><TwitterIcon className="h-5 sm:h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1 sm:mr-2" /></Link>}
                        {(socials && socials.linkedin) && <Link to={`https://www.linkedin.com/in/${socials.linkedin}/`} className="sm:mt-3"><LinkedinIcon className="h-5 sm:h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1 sm:mr-2" /></Link>}
                        {(socials && socials.github) && <Link to={`https://github.com/${socials.github}/`} className="sm:mt-3"><GithubIcon className="h-5 sm:h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1 sm:mr-2" /></Link>}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {(loggedUser && (loggedUser.username == username || loggedUser.admin)) ? <UpdateDescr username={username} defaultDescription={description} /> : <p className="pb-6">{(description.split(/\n/).map(line => <Fragment key={line}>{line}<br /></Fragment>) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")}</p>}
                <h3 className="text-2xl font-inter mt-6" >Positions</h3>
                {allPositions.map((p, i) => <Experience key={i} index={i} position={p} admin={loggedUser && loggedUser.admin} owner={username} />)}
                <div className={(allowedBlogs.length <= 0 || (loggedUser && (loggedUser.username == username || loggedUser.admin))) ? "hidden" : null}>
                    <h3 className="text-2xl font-inter mt-6" >Blog Posts</h3>
                    {allowedBlogs.map((b, i) => <BlogItem key={i} index={i} blog={b} />)}
                </div>
                
                {(loggedUser && loggedUser.admin) && <AddPosition username={username} />}
                {(loggedUser && (loggedUser.username == username || loggedUser.admin)) && <UpdateSocial username={username} defaultQwale={(socials && socials.qwale) || ""} defaultTwitter={(socials && socials.twitter) || ""} defaultLinkedin={(socials && socials.linkedin) || ""} defaultGithub={(socials && socials.github) || ""} />}
                {(loggedUser && (loggedUser.username == username || loggedUser.admin)) && <UpdateMisc username={username} defaultEmail={email} />}
                {(loggedUser && loggedUser.admin) && <DeleteButton username={username} /> }
            </CardContent>
        </Card>
    )
}

const dateString = date => `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`

const Experience = ({index, position, admin, owner}) => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const uteam = useSelector(({team}) => team)

    const removeExperience = async() => {
        const updatedMember = await teamService.removePosition(owner, {id: position._id, type: position.board ? "bod" : "na"})
        dispatch(setTeam(uteam.map(m => m.username==owner ? updatedMember : m)))
        toast({
            title: "Removed Position",
            description: "Successfully removed position from profile.",
        })
    }

    return(
        <>
            {index==0 ? null : <Separator className="my-2" />}
            <div className="py-2">
                <div className="flex flex-col sm:flex-row">
                    <h3 className="text-lg">{position.position || "unknown position"}</h3>
                    <div className="flex justify-start pt-1 sm:pt-0">
                        {!position.end ? <Badge className="mr-2 sm:ml-4 sm:mr-0" variant="secondary">Current</Badge> : null}
                        {position.executive ? <Badge className="mr-2 sm:ml-4 sm:mr-0" variant="outline">Executive Leadership</Badge> : null}
                        {position.board ? <Badge className="mr-2 sm:ml-4 sm:mr-0" variant="outline">Board of Directors</Badge> : null}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">{(position.start && dateString(position.start)) || "Unknown"} - {(position.end && dateString(position.end)) || "Present"}</p>
                {admin ? <AlertedButton action={removeExperience} /> : null}
            </div>
        </>
    )
}

const BlogItem = ({index, blog}) => {

    return(
        <>
            {index==0 ? null : <Separator className="my-2" />}
            <div className="py-2 hover:underline">
                <Link to={`/blog/${blog.id}`}>
                    <div className="flex flex-col sm:flex-row">
                        <h3 className="text-lg">{blog.title || "untitled blog post"}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{(blog.publishDate && dateString(new Date(blog.publishDate))) || "Unknown"}</p>
                </Link>
            </div>
        </>
    )
}

const AlertedButton = ({ action }) => {
    
    return(
        
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="mt-4" variant="destructive">Delete Position</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            account and remove data from servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>Delete Position</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default MemberPage