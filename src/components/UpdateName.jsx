import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import teamService from '../services/team'
import { setTeam } from '../reducers/teamReducer'

import { useDispatch, useSelector } from 'react-redux'

const formSchema = z.object({
    name: z.string()
})

const UpdateName = ({defaultName = "", username}) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: defaultName
        },
    })

    const dispatch = useDispatch()
    const { toast } = useToast()
    const uteam = useSelector(({team}) => team)
    const onSubmit = async({name}) => {
        await teamService.updateName(username, {name: name}).then(() => {
            dispatch(setTeam(uteam.map(m => m.username==username ? {...m, name: name} : m)))
            toast({
                title: "Updated profile name",
                description: "Updated the name of the associated Qwale Corporate account.",
            })
        }).catch((err) => {
            toast({
                title: "An error occurred",
                description: "The name was either invalid or wasn't accepted.",
            })
        })
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col sm:flex-row">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-2 sm:mt-0 ml-0 sm:ml-2">Update Name</Button>
                </div>
            </form>
        </Form>
    )
}

export default UpdateName