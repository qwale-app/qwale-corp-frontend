import { GithubIcon, InstagramIcon, LinkedinIcon, MailIcon, TwitterIcon } from 'lucide-react'
import { useEffect } from 'react'

const Contact = () => {
    useEffect(() => {
        document.title = "Qwale Corporate | Contact"
    }, [])

    return(
        <>
            <div className="my-auto">
                <div className="flex flex-col">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-outfit font-semibold text-center mb-4 sm:mt-12 mx-4">Talk to us</h2>
                    <p className="text-foreground text-lg font-inter text-center">Get support or inquire to us at Qwale.</p>
                    <p className="text-foreground text-lg text-center mb-4 sm:mb-8">Contact us today @ <a href="mailto:contact@qwale.ca" className="font-semibold underline hover:no-underline">contact@qwale.ca</a></p>
                    <div className="flex flex-row mx-auto gap-3">
                        <a className="text-foreground hover:text-muted-foreground transition-colors" href="mailto:contact@qwale.ca">
                            <MailIcon className="w-7 h-7" />
                        </a>
                        <a className="text-foreground hover:text-muted-foreground transition-colors" target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/qwale.app/">
                            <InstagramIcon className="w-7 h-7" />
                        </a>
                        <a className="text-foreground hover:text-muted-foreground transition-colors" target="_blank" rel="noreferrer noopener" href="https://www.linkedin.com/company/qwale">
                            <LinkedinIcon className="w-7 h-7" />
                        </a>
                        <a className="text-foreground hover:text-muted-foreground transition-colors" target="_blank" rel="noreferrer noopener" href="https://github.com/qwale-app">
                            <GithubIcon className="w-7 h-7" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact