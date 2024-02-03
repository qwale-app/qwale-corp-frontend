import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form'
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/components/ui/use-toast'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import teamService from '../services/team'
import { setTeam } from '../reducers/teamReducer'

import { useDispatch, useSelector } from 'react-redux'

const formSchema = z.object({
    description: z.string()
})

const UpdateDesc = ({defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", username}) => {
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: defaultDescription
        },
    })

    const dispatch = useDispatch()
    const uteam = useSelector(({team}) => team)
    const onSubmit = async({description}) => {
        teamService.updateDesc(username, {description: description})
            .then(() => {
                dispatch(setTeam(uteam.map(m => m.username==username ? {...m, description: description} : m)))
                toast({
                    title: "Updated personal bio",
                    description: "Updated your personal bio.",
                })
            })
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Personal Bio</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-64" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="my-8">Update Bio</Button>
                </div>
            </form>
        </Form>
    )
}

export default UpdateDesc