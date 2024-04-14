import ProjectCard from '@/components/ProjectCard'
import NAVIGATION_DATA from '@/navigation'

import { useRef, useEffect } from 'react'

const Homepage = () => {
    useEffect(() => {
        document.title = "Qwale, Inc."
    }, [])
    const viewProj = useRef(null)
    return(
        <>
            <div className="my-auto">
                <div className="flex flex-col mt-20">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-outfit font-semibold text-center mb-4 sm:mt-12 mx-4"><span className="underline decoration-indigo-600 dark:decoration-blue-700"><span className="bg-gradient-to-tl from-blue-700 to-purple-500 inline text-transparent bg-clip-text">SaaS solutions</span></span> for consumers and enterprises</h2>
                </div>
            </div>
            <h2 className="text-foreground text-2xl sm:text-4xl font-outfit font-semibold text-center mb-4" ref={viewProj}>Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 px-8 gap-4 max-w-[60rem] w-full py-4 mx-auto">
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