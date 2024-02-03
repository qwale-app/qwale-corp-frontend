import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import { CalendarIcon } from "@radix-ui/react-icons"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { useState } from 'react'

import teamService from '../services/team'
import { setTeam } from '../reducers/teamReducer'

import { useDispatch, useSelector } from 'react-redux'

import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
    position: z.string(),
    executive: z.boolean().default(false),
    board: z.boolean().default(false),

    start: z.date(),

    current: z.boolean().default(true),
    end: z.date(),
})

const AddPosition = ({username}) => {
    const [current, setCurrent] = useState(true)
    const [isBoard, setIsBoard] = useState(false)
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            position: "",
            executive: false,
            board: false,
            start: new Date(),
            end: new Date(),
            current: true,
        },
    })

    const dispatch = useDispatch()
    const uteam = useSelector(({team}) => team)

    const onSubmit = async(values) => {
        const updatedUserInf = {...uteam.find(m => m.username == username)}
        if(values.board) {
            updatedUserInf.board = updatedUserInf.board.concat(values.current ? {start: values.start} : {start: values.start, end: values.end})
        } else {
            updatedUserInf.positions = updatedUserInf.positions.concat(values.current ? {position: values.position, start: values.start, executive: values.executive} : {position: values.position, start: values.start, end: values.end, executive: values.executive})
        }

        const updatedUser = await teamService.updateAll(username, updatedUserInf)
        dispatch(setTeam(uteam.map(m => m.username == username ? updatedUser : m)))

        toast({
            title: "Added position",
            description: "Successfully added the position to the user's profile.",
        })

        form.reset({
            position: "",
            executive: false,
            board: false,
            start: new Date(),
            end: new Date(),
            current: true,
        })
    }

    return(
        <>
            <Separator className="mt-8" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem className={`${isBoard ? "hidden" : ""}`}>
                                <FormLabel>Position Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Position name" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="board"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(event) => {field.onChange(event); setIsBoard(event)}}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>This is a board position</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="executive"
                        render={({ field }) => (
                            <FormItem className={`${isBoard ? "hidden" : "flex"} flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow`}>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>This is an executive position</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="current"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(event) => {field.onChange(event); setCurrent(event)}}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>This is a current position</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="start"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Position Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="end"
                        render={({ field }) => (
                            <FormItem className={`${current ? "hidden" : "flex"} flex-col`}>
                                <FormLabel>Position End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Add Position</Button>
                </form>
            </Form>
        </>
    )
}

export default AddPosition