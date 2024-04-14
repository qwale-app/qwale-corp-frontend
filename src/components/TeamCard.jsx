import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from '@/components/ui/button'
import { useNavigate, Link } from 'react-router-dom'

import teamService from '../services/team'

import { QwaleIcon, TwitterIcon, LinkedinIcon, GithubIcon } from './Icons'
import { ArrowRightCircle } from "lucide-react"

const TeamCard = ({card, isBoard = false}) => {
    const {name, description, socials, positions, img, username} = card
    const navigate = useNavigate()

    const isCurrent = positions && positions.some(p => !p.end)

    const currentPosition = isBoard ? "Board Member" : (isCurrent && positions.filter((p) => !p.end).find((p) => !p.board).position) || "Unassigned/None"
    const fallback = name.match(/\w+/g).map(s => s[0]).join('').toUpperCase()


    return(
        <Card className="max-w-[24rem] mx-auto">
            <Avatar className="flex flex-col w-14 h-14 mt-5 ml-5">
                <AvatarImage src={(img && teamService.getImg(username)) || `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}&backgroundColor=e0e0e0`} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <CardHeader>
                <CardTitle className="line-clamp-1 font-outfit">{name}</CardTitle>
                <CardDescription>{currentPosition}</CardDescription>
                <div className="pt-3 flex flex-row">
                    {(socials && socials.qwale) && <Link to={`https://qwale.app/u/${socials.qwale}`}><QwaleIcon className="h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1" /></Link>}
                    {(socials && socials.twitter) && <Link to={`https://twitter.com/${socials.twitter}`}><TwitterIcon className="h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1" /></Link>}
                    {(socials && socials.linkedin) && <Link to={`https://www.linkedin.com/in/${socials.linkedin}`}><LinkedinIcon className="h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1" /></Link>}
                    {(socials && socials.github) && <Link to={`https://github.com/${socials.github}`}><GithubIcon className="h-6 fill-muted-foreground hover:fill-card-foreground transition-colors mr-1" /></Link>}
                </div>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-1 sm:line-clamp-2">{description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
            </CardContent>
            <Link className="border-t border-border h-12 flex hover:bg-muted transition-colors" to={(`/team/${username}`)}>
                <span className="flex flex-row my-auto mx-auto gap-2">
                    <p className="my-auto">View Profile</p>
                    <ArrowRightCircle className="my-auto w-5 h-5" />
                </span>
            </Link>
        </Card>
    )
}

export default TeamCard