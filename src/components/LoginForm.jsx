import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import teamService from '../services/team'

import blogService from '../services/blog'
import { setOwned } from '../reducers/blogReducer'

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const formSchema = z.object({
    username: z.string().min(3, {
        message: "Invalid username.",
    }),
    password: z.string().min(8, {
        message: "Invalid password.",
    }),
})

const LoginFormList = () => {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    useEffect(() => {
        document.title = "Qwale Corporate | Login"
    }, [])

    const dispatch = useDispatch()
    const currentUser = useSelector(({login}) => login)

    const onLogin = async({username, password}) => {
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedQwaleEmployee', JSON.stringify(user))
            dispatch(login(user))
            teamService.setToken(user.token)
            blogService
                .getOwnedPosts()
                .then(ownedBlogs => {
                    dispatch(setOwned(ownedBlogs))
                    toast({
                        title: "Logged In",
                        description: "Successfully logged in with Qwale Corporate.",
                    })
                })
        } catch (e) {
            toast({
                title: "Wrong username or password",
                description: "The username or password entered was incorrect.",
                action: (
                    <ToastAction altText="Reset Password" onClick={() => navigate("/team/reset")}>Reset Password</ToastAction>
                ),
            })
        }
    }

    const navigate = useNavigate()
    useEffect(() => {
        if(currentUser) navigate(`/team${currentUser.username ? `/${currentUser.username}` : ""}`)
    }, [currentUser])

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex flex-row" ><Button type="submit">Login</Button><Button className="ml-2" variant="secondary" onClick={(e) => {e.preventDefault(); navigate("/team/reset")}}>Reset Password</Button></div>
            </form>
        </Form>
    )
}

const LoginForm = () => {
    return(
        <div className="my-auto">
            <div className="flex flex-col">
                <h2 className="text-foreground text-4xl sm:text-6xl font-outfit font-semibold text-center mb-4 mx-4">Login to Qwale Corporate</h2>
                <Card className="mx-4 mb-8">
                    <CardHeader>
                        <CardTitle className="font-outfit">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LoginFormList />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default LoginForm