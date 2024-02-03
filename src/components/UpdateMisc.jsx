import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from '@/components/ui/use-toast'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import teamService from '../services/team'
import { setTeam } from '../reducers/teamReducer'
import { logout } from '../reducers/loginReducer'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
    username: z.string().min(3, {
        message: "Invalid username.",
    }),
    email: z.string()
})

const UpdateUsername = ({defaultEmail = "", username}) => {
    const { toast } = useToast()
    const id = username
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: username,
            email: defaultEmail
        },
    })

    const dispatch = useDispatch()
    const uteam = useSelector(({team}) => team)
    const loggedIn = useSelector(({login}) => login)
    const navigate = useNavigate()
    const onSubmit = async({username, email}) => {
        try{
            await teamService.updateMisc(id, {username, email})
            dispatch(setTeam(uteam.map(m => m.username==id ? {...m, username, email} : m)))
            toast({
                title: "Updated account info",
                description: "Updated the Qwale Corporate account.",
            })
            if(id == loggedIn.username) {
                await teamService.logoutToken()
                window.localStorage.removeItem('loggedQwaleEmployee')
                dispatch(logout())
                navigate(`/team/login`)
            } else {
                navigate(`/team/${username}`)
            }
        } catch(err) {
            toast({
                title: "An error occurred",
                description: "An error occurred while updating the Qwale Corporate account.",
            })
        }
    }

    return(
        <>
            <Separator className="mt-8" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save Account Info</Button>
                </form>
            </Form>
        </>
    )
}

export default UpdateUsername