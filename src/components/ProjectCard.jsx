import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from "react-router-dom"

const ProjectCard = ({card}) => {
    const {title, description, econ, href} = card
    return(
        <Card className="mx-4 mb-8">
            <div className="flex flex-col w-14 h-14 mt-3 ml-3 bg-primary-foreground rounded-xl">
                <p className="text-center my-auto text-xl">
                    {econ || '⚡'}
                </p>
            </div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {href && <Link className={buttonVariants({variant: "outline"}) + " mt-4"} to={href}>{title}</Link>}
            </CardContent>
        </Card>
    )
}

export default ProjectCard