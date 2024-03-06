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
    const [lightMode, setLightMode] = React.useState(false)

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
            <div className="flex py-2 shadow-lg fixed w-full bg-background transition-colors z-40">
                <div className="h-auto ml-5 md:ml-20 my-auto w-8 sm:w-36">
                    <Link className="flex content-center" to="/">
                        <QwaleIcon className="h-7 fill-qhigh" />
                    </Link>
                </div>
                <div className="ml-auto mr-5 md:mr-20">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <DropdownMenuItem itemText="Projects"/>
                            <DropdownMenuItem itemText="About"/>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <Outlet/>
            <Toaster />
            <div className="py-2 px-4 h-[2.5rem] w-full flex content-center bg-opacity-5 bg-black z-40">
                <p className="ml-0 mr-auto text-sm">© 2024 Qwale, Inc.</p>
                <div className="ml-auto mr-0 flex">
                    <p className="text-sm inline-block mr-2 my-auto text-center justify-center">Light Mode</p>
                    <Switch checked={lightMode} onCheckedChange={switchMode} />
                </div>
            </div>
        </>
    )
}
  
const DropdownMenuItem = ({ itemText }) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>{itemText}</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {NAVIGATION_DATA
                        .filter((component) => component.group && component.group.toLowerCase() == itemText.toLowerCase() && !component.hide)
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
                        "block select-none h-full max-w-[calc(100%-2.2rem)] md:max-w-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})

ListItem.displayName = "ListItem"

export default Navbar