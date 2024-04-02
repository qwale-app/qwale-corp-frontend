import { Button } from '@/components/ui/button'
import ProjectCard from '@/components/ProjectCard'
import NAVIGATION_DATA from '@/navigation'

import { useRef, useEffect } from 'react'

const Homepage = () => {
    useEffect(() => {
        document.title = "Qwale Corporate"
    }, [])
    const viewProj = useRef(null)
    return(
        <>
            <div className="pt-[calc((10vh-3rem)*4)] pb-[calc((10vh-4rem)*4+3rem)]">
                <div className="flex flex-col pb-64 pt-[calc((10vh+1.5rem)*2)] md:pt-[calc((10vh+1rem)*2)]">
                    <h2 className="text-foreground text-3xl sm:text-6xl font-inter text-center mb-12 sm:mt-12 mx-4">Revolutionizing <span className="underline decoration-indigo-600 dark:decoration-blue-700"><span className="bg-gradient-to-tl from-indigo-200 to-purple-200 dark:from-blue-700 dark:to-purple-500 inline text-transparent bg-clip-text">software development</span></span>.</h2>
                    <div className="flex justify-center">
                        <Button variant="outline" onClick={() => viewProj.current.scrollIntoView({behavior: 'smooth', block: 'start'})}>Our Work</Button>
                    </div>
                </div>
            </div>
            <h2 className="text-foreground text-4xl font-inter text-center mb-6 mt-10" ref={viewProj}>Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 px-10 sm:px-0 lg:px-16 xl:px-48 mb-24">
                {
                    NAVIGATION_DATA
                        .filter((page) => page.group.toLowerCase() == 'projects' && !page.hide)
                        .map((page, i) => <ProjectCard key={i} card={page} />)
                }
            </div>
        </>
    )
}

export default Homepage