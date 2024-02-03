import { useEffect } from 'react'

const About = () => {
    useEffect(() => {
        document.title = "Qwale Corporate | About"
    }, [])
    return(
        <>
            <div className="h-full pt-20 min-h-[calc(100vh-2.5rem)]">
                <div className="flex flex-col pt-12 md:pt-32 lg:pt-40 xl:pt-64 sm:pt-24">
                    <svg className="h-16 fill-qhigh" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M308.284 251.716L256.569 200H200V256.569L343.132 399.701L399.701 343.132L366.849 310.28C384.687 283.29 395.827 252.198 399.037 219.603C403.572 173.555 392.001 127.359 366.294 88.886C340.587 50.413 302.336 22.0437 258.057 8.61194C213.778 -4.81984 166.212 -2.48307 123.463 15.2241C80.7144 32.9313 45.4278 64.9132 23.6158 105.721C1.80373 146.528 -5.18409 193.636 3.84295 239.018C12.87 284.4 37.3533 325.248 73.1213 354.602C108.889 383.956 153.729 400 200 400V320C172.237 320 145.334 310.374 123.873 292.761C102.412 275.149 87.722 250.64 82.3058 223.411C76.8895 196.182 81.0822 167.917 94.1694 143.432C107.257 118.948 128.429 99.7588 154.078 89.1345C179.727 78.5102 208.267 77.1081 234.834 85.1672C261.401 93.2262 284.352 110.248 299.776 133.332C315.2 156.415 322.143 184.133 319.422 211.762C318.047 225.729 314.244 239.236 308.284 251.716Z"/>
                    </svg>
                    <h2 className="text-foreground text-4xl md:text-6xl font-inter text-center mb-4 mx-4 mt-8">About Qwale</h2>
                    <p className="text-foreground text-lg font-inter text-center">Who are we?</p>
                    <p className="text-foreground text-md sm:text-lg text-center mb-4 sm:mb-8 mx-10 sm:mx-20 md:mx-24 lg:mx-32 xl:mx-52">{"We're a team dedicated to building software solutions that meet the needs and solve the problems of people in their everyday lives. Our goal is to support not just any one group of people, but to create solutions that impact as many people as possible, in a safe and responsible manner. Our team is made up of several contributors, all with the ideal to make innovation and improvement possible through the use of software and SaaS."}</p>
                </div>
            </div>
        </>
    )
}

export default About