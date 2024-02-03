import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

const ProjectCard = ({card}) => {
    const {title, description, econ, href} = card
    return(
        <Card className="mx-4 mb-8">
            <div className="flex flex-col w-14 h-14 mt-3 ml-3 bg-primary-foreground rounded-md">
                <p className="text-center my-auto text-xl">
                    {econ || '⚡'}
                </p>
            </div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {href && <Button variant="outline" className="mt-4" onClick={() => window.location.href = href}>{title}</Button>}
            </CardContent>
        </Card>
    )
}

export default ProjectCard