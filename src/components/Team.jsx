import TeamList from './TeamList'
import { Button } from '@/components/ui/button'

import teamService from '../services/team'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { appendTeam } from '../reducers/teamReducer'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useToast } from '@/components/ui/use-toast'

const Team = () => {
    useEffect(() => {
        document.title = "Qwale Corporate | Team"
    }, [])

    const dispatch = useDispatch()
    const { toast } = useToast()

    const onLogout = async() => {
        await teamService.logoutToken()
        window.localStorage.removeItem('loggedQwaleEmployee')
        dispatch(logout())
        toast({
            title: "Logged Out",
            description: "Successfully logged out of Qwale Corporate account.",
        })
        navigate("/team/login")
    }

    const allMembers = useSelector(({ team }) => team)
    const teamMembers = [...allMembers].filter(m => (m.positions && m.positions.some(p => !p.end)) || (m.board && m.board.some(p => !p.end)))
    const normMembers = teamMembers.filter(m => m.positions && m.positions.length > 0 && !m.positions.some(p => p.executive && !p.end))


    const loggedUser = useSelector(({ login }) => login)

    const unassignedMembers = (loggedUser && loggedUser.admin) ? allMembers.filter(m => ((!m.positions) || (!(m.positions.length>0)) || !m.positions.some(p => !p.end)) && ((!m.board) || !m.board.some(p => !p.end))) : []

    const navigate = useNavigate()

    const createNewUser = () => {
        teamService.create().then(u => {
            dispatch(appendTeam(u))
            navigate(`/team/${u.username}`)
            toast({
                title: "Created User",
                description: "Successfully created new Qwale Corporate user.",
            })
        })
    }

    return(
        <>
            <div className="my-auto">
                <div className="flex flex-col mt-20">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-outfit font-semibold text-center mb-4 sm:mt-12 mx-4">Meet our team</h2>
                </div>
            </div>

            <div className={`${loggedUser ? "flex" : "hidden"} flex-row justify-center`}>
                <Button className="mx-1" onClick={onLogout}>Logout</Button>
                {loggedUser && loggedUser.admin && <Button className="mx-1" onClick={createNewUser}>New User</Button>}
                <Button className="mx-1" onClick={() => navigate(`/team/${loggedUser.username}`)}>My Profile</Button>
                <Button className="mx-1" onClick={() => navigate(`/blog/drafts`)}>My Blogs</Button>
            </div>

            {
                teamMembers.filter(m => m.positions && m.positions.some(p => p.executive && !p.end)).length>0 ?
                    <>
                        <h2 className="text-foreground text-2xl sm:text-4xl font-outfit font-semibold text-center mb-4">Executive Leadership</h2>
                        <TeamList cards={teamMembers.filter(m => m.positions && m.positions.some(p => p.executive && !p.end))} />
                    </> : null
            }
            
            {
                teamMembers.filter(m => m.board && m.board.some(p => !p.end)).length>0 ?
                    <>
                        <h2 className="text-foreground text-2xl sm:text-4xl font-outfit font-semibold text-center mb-4 mt-10">Board Governance</h2>
                        <TeamList cards={teamMembers.filter(m => m.board && m.board.some(p => !p.end))} isBoard={true} />
                    </> : null
            }
            
            {
                normMembers.length > 0 ? <><h2 className="text-foreground text-2xl sm:text-4xl font-outfit font-semibold text-center mb-4 mt-10">The Team</h2>
                    <TeamList cards={normMembers} /></> : null
            }

            {
                (loggedUser && loggedUser.admin && unassignedMembers.length > 0) ? <><h2 className="text-foreground text-2xl sm:text-4xl font-outfit font-semibold text-center mb-4 mt-10">Inactive Members</h2>
                    <TeamList cards={unassignedMembers} /></> : null
            }
        </>
    )
}

export default Team