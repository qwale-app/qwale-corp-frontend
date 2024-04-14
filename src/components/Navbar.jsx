import * as React from "react"
import { cn } from '../lib/utils'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu"
import { Toaster } from '@/components/ui/toaster'
import { Switch } from '../components/ui/switch'

import NAVIGATION_DATA from '../navigation'
import { Link, Outlet, useLocation } from 'react-router-dom'

import teamService from '../services/team'
import { setTeam } from '../reducers/teamReducer'

import { login } from '../reducers/loginReducer'

import { setOwned } from '../reducers/blogReducer'
import blogService from '../services/blog'

import { useDispatch } from 'react-redux'
import { QwaleIcon } from "./Icons"

const Navbar = (props) => {
    const dispatch = useDispatch()
    const [lightMode, setLightMode] = React.useState(true)

    const switchMode = (state) => {
        setLightMode(state)
        window.localStorage.setItem('qwaleHomeTheme', state?"light":"dark")
    }

    React.useEffect(() => {
        const theme = window.localStorage.getItem('qwaleHomeTheme')
        if(theme) setLightMode(theme=="light")

        const user = window.localStorage.getItem('loggedQwaleEmployee')
        if(user) {
            dispatch(login(JSON.parse(user)))
            teamService.setToken(JSON.parse(user).token)
            blogService
                .getOwnedPosts()
                .then(ownedBlogs => dispatch(setOwned(ownedBlogs)))
        }

        teamService
            .getAll()
            .then(initialTeam => dispatch(setTeam(initialTeam)))
    },[])

    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    },[pathname])
  
    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', !lightMode)
    },[lightMode])
    

    return (
        <>
            <div className="flex py-2 shadow-lg px-2 fixed w-full bg-background transition-colors z-40 gap-2 sm:gap-4">
                <div className="h-auto ml-3 md:ml-20 my-auto mr-0 select-none">
                    <Link className="flex content-center gap-2" to="/">
                        <QwaleIcon className="h-7 fill-qhigh my-auto" />
                        <h1 className="text-2xl font-semibold my-auto font-outfit">Qwale</h1>
                    </Link>
                </div>
                <div className="ml-auto sm:mr-auto sm:ml-0 select-none">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <DropdownMenuItem itemText="Solutions" filter="projects"/>
                            <DropdownMenuItem itemText="About" filter="about"/>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div className="min-h-[100dvh] flex flex-col">
                <Outlet/>
                <Toaster />
                <div className="py-2 px-4 h-[2.5rem] w-full flex content-center mb-0 mt-0 border-t border-border z-40 select-none">
                    <p className="ml-0 mr-auto text-sm">© 2024 Qwale, Inc.</p>
                    <div className="ml-auto mr-0 flex">
                        <p className="text-sm inline-block mr-2 my-auto text-center justify-center">Light Mode</p>
                        <Switch checked={lightMode} onCheckedChange={switchMode} />
                    </div>
                </div>
            </div>
        </>
    )
}
  
const DropdownMenuItem = ({ itemText, filter }) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>{itemText}</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {NAVIGATION_DATA
                        .filter((component) => component.group && component.group.toLowerCase() == filter.toLowerCase() && !component.hide)
                        .map((component, i) => (
                            <ListItem
                                key={`${i}${itemText}${component.title}`}
                                title={component.title}
                                href={component.href}
                            >
                                {component.description}
                            </ListItem>
                        ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}
  
const StandaloneMenuItem = ({ itemText, href }) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link to={href} className={navigationMenuTriggerStyle()}>
                    {itemText}
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}
  
const ListItem = React.forwardRef(({ className, title, href, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    to={href || null}
                    className={cn(
                        "block select-none h-full w-full md:max-w-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-1 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})

ListItem.displayName = "ListItem"

export default Navbar