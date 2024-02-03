import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState, useEffect, useMemo } from "react"
import teamService from '@/services/team'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useSelector } from 'react-redux'

const ResetForm = () => {
    const [userreset, setUserreset] = useState("")
    const navigate = useNavigate()

    const currentUser = useSelector(({login}) => login)

    const { toast } = useToast()

    useEffect(() => {
        document.title = "Qwale Corporate | Reset Password"
    }, [])

    useEffect(() => {
        if(currentUser) navigate("/team")
    }, [currentUser])

    const resetAction = () => {
        teamService.resetSend(userreset)
            .then(() => {
                toast({
                    title: "Reset email sent",
                    description: "A reset password link has been sent to the email associated with the account.",
                    action: (
                        <ToastAction altText="Go to login" onClick={() => navigate("/team/login")}>Login</ToastAction>
                    ),
                })
            })
            .catch(() => {
                toast({
                    title: "An error occurred",
                    description: "The username entered is not associated with a Qwale Corporate account.",
                })
            })
    }

    return(
        <>
            <div className="h-full pt-20 min-h-[calc(100vh-2.5rem)]">
                <div className="flex flex-col pt-48 md:pt-64 sm:pt-52">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-inter text-center mb-4 sm:mt-12 mx-4">Reset your Qwale Corporate login</h2>
                    <Card className="mx-4 mb-8">
                        <CardHeader>
                            <CardTitle>Reset Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label>Username</Label>
                            <Input className="mt-2" placeholder="username" name="username" value={userreset} onChange={(e) => setUserreset(e.target.value)} />
                            <div className="flex flex-row mt-8" ><Button onClick={resetAction}>Reset</Button><Button className="ml-2" variant="secondary" onClick={(e) => {e.preventDefault(); navigate("/team/login")}}>Login</Button></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

const ResetPassPrompt = ({token, user}) => {
    const [np, setNp] = useState("")
    const [npr, setNpr] = useState("")
    const navigate = useNavigate()

    const currentUser = useSelector(({login}) => login)

    const { toast } = useToast()

    useEffect(() => {
        document.title = "Qwale Corporate | Reset Password"
    }, [])

    useEffect(() => {
        if(currentUser) navigate("/team")
    }, [currentUser])

    const resetAction = () => {
        if(np !== npr) {
            toast({
                title: "Passwords must match",
                description: "You must repeat your password.",
            })
        }
        teamService.resetPassword(token, user, np)
            .then(() => {
                toast({
                    title: "Password reset",
                    description: "The user's password was successfully updated.",
                })
                navigate("/team/login")
            })
            .catch(() => {
                toast({
                    title: "An error occurred",
                    description: "An error occurred while trying to reset the user's password. Try again later.",
                })
            })
    }

    return(
        <>
            <div className="h-full pt-20 min-h-[calc(100vh-2.5rem)]">
                <div className="flex flex-col pt-48 md:pt-64 sm:pt-52">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-inter text-center mb-4 sm:mt-12 mx-4">Reset your Qwale Corporate login</h2>
                    <Card className="mx-4 mb-8">
                        <CardHeader>
                            <CardTitle>Reset Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label>New Password</Label>
                            <Input className="mt-2 mb-8" type="password" placeholder="new password" name="np" value={np} onChange={(e) => setNp(e.target.value)} />
                            <Label>Repeat Password</Label>
                            <Input className="mt-2" type="password" placeholder="new password" name="npr" value={npr} onChange={(e) => setNpr(e.target.value)} />
                            <div className="flex flex-row mt-8" ><Button onClick={resetAction}>Reset</Button><Button className="ml-2" variant="secondary" onClick={(e) => {e.preventDefault(); navigate("/team/login")}}>Login</Button></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPage = () => {
    const query = useQuery()

    const token = query.get("token")
    const userId = query.get("user")

    if(!(userId && token)) {
        return <ResetForm />
    }

    return <ResetPassPrompt token={token} user={userId} />
}

export default ResetPage