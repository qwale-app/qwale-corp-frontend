import { useEffect, useState } from 'react'

const Error = () => {
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        document.title = "Qwale Corporate | Error"
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowError(true)
        }, 500)
    }, [])

    return(
        <>
            <div className="my-auto">
                <div className={`flex flex-col ${showError ? "opacity-100" : "opacity-0"}`}>
                    <h2 className="text-foreground text-4xl sm:text-6xl font-outfit font-semibold text-center mb-4 sm:mt-12 mx-4">An error occured</h2>
                    <p className="text-foreground text-lg font-inter text-center">Are you sure you&#39;re in the right place?</p>
                    <div className="flex justify-center">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error