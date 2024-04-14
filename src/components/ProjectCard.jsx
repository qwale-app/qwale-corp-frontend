import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowRightCircle } from "lucide-react"
import qwaleSvg from '@/assets/qwale.svg'

const ProjectCard = ({card}) => {
    const {title, description, econ, href, img} = card
    return(
        <Card>
            {img ?
                <img className="w-14 h-14 mt-3 ml-3 aspect-square rounded-xl bg-muted select-none" src={img} />
                :
                <div className="flex flex-col w-14 h-14 mt-3 ml-3 bg-muted rounded-xl select-none">
                    <p className="text-center my-auto text-xl">
                        {econ || '⚡'}
                    </p>
                </div>
            }
            <CardHeader>
                <CardTitle className="font-outfit">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {href && <Link className="border-t border-border h-12 flex hover:bg-muted rounded-b-3xl transition-colors" target="_blank" rel="noreferrer noopener" to={href}>
                <span className="flex flex-row my-auto mx-auto gap-2">
                    <p className="my-auto">Learn more</p>
                    <ArrowRightCircle className="my-auto w-5 h-5" />
                </span>
            </Link>}
        </Card>
    )
}

export default ProjectCard