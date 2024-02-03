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

import { useDispatch, useSelector } from 'react-redux'

const formSchema = z.object({
    qwale: z.string(),
    twitter: z.string(),
    linkedin: z.string(),
    github: z.string()
})

const UpdateSocial = ({defaultQwale = "", defaultTwitter = "", defaultLinkedin = "", defaultGithub="", username}) => {
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            qwale: defaultQwale,
            twitter: defaultTwitter,
            linkedin: defaultLinkedin,
            github: defaultGithub
        },
    })

    const dispatch = useDispatch()
    const uteam = useSelector(({team}) => team)

    const onSubmit = async({qwale, linkedin, twitter, github}) => {
        try {
            const updatedMember = await teamService.updateSocial(username, {qwale, linkedin, twitter, github})
            dispatch(setTeam(uteam.map(m => m.username==username ? updatedMember : m)))
            toast({
                title: "Updated profile social media",
                description: "Updated the social media links of the associated Qwale Corporate account.",
            })
        } catch (err) {
            toast({
                title: "An error occurred",
                description: "The social accounts were either invalid or weren't accepted.",
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
                        name="qwale"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>qwale.app</FormLabel>
                                <FormControl>
                                    <Input placeholder="qwale.app username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                    <Input placeholder="LinkedIn Username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                    <Input placeholder="Twitter Username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Github</FormLabel>
                                <FormControl>
                                    <Input placeholder="Github Username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save Social Links</Button>
                </form>
            </Form>
        </>
    )
}

export default UpdateSocial