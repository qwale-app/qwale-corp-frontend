import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const Contact = () => {
    useEffect(() => {
        document.title = "Qwale Corporate | Contact"
    }, [])

    return(
        <>
            <div className="pt-[calc((10vh-2.5rem)*4)] h-[calc(100vh-2.5rem)]">
                <div className="flex flex-col pt-[calc((10vh)*2)] md:pt-[calc((9vh)*2)]">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-inter text-center mb-4 sm:mt-12 mx-4">Talk to us</h2>
                    <p className="text-foreground text-lg font-inter text-center">Get support or inquire to us at Qwale.</p>
                    <p className="text-foreground text-lg text-center mb-4 sm:mb-8">Contact us today @ contact@qwale.ca</p>
                    <div className="flex justify-center">
                        <Button variant="outline" onClick={() => window.open("mailto:contact@qwale.ca")}>Email us</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact