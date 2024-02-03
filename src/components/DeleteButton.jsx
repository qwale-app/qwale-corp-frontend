import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/components/ui/use-toast'

import teamService from '../services/team'
import { setTeam } from '../reducers/teamReducer'

import loginService from '../services/login'
import { logout } from '../reducers/loginReducer'

import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

const DeleteButton = ({ username }) => {
    const { toast } = useToast()

    const allMembers = useSelector(({team}) => team)
    const loggedUser = useSelector(({login}) => login)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const onDeleteAccount = async() => {
        try{
            await teamService.deleteUser(username)
            dispatch(setTeam(allMembers.filter(m => m.username !== username)))
            if(username == loggedUser.username) {
                await loginService.logout()
                window.localStorage.removeItem('loggedQwaleEmployee')
                dispatch(logout())
            }
            toast({
                title: "Successfully deleted the account.",
                description: "The Qwale Corporate user was successfully removed.",
            })
            navigate(`/team`)
        } catch(err) {
            toast({
                title: "An error occurred",
                description: "An error occurred while deleting the account.",
            })
        }
    }
    
    return(
        
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="mt-2" variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            account and remove data from servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeleteAccount}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteButton