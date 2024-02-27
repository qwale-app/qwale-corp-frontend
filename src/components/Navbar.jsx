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
                        <svg className="h-8 fill-qhigh" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M308.284 251.716L256.569 200H200V256.569L343.132 399.701L399.701 343.132L366.849 310.28C384.687 283.29 395.827 252.198 399.037 219.603C403.572 173.555 392.001 127.359 366.294 88.886C340.587 50.413 302.336 22.0437 258.057 8.61194C213.778 -4.81984 166.212 -2.48307 123.463 15.2241C80.7144 32.9313 45.4278 64.9132 23.6158 105.721C1.80373 146.528 -5.18409 193.636 3.84295 239.018C12.87 284.4 37.3533 325.248 73.1213 354.602C108.889 383.956 153.729 400 200 400V320C172.237 320 145.334 310.374 123.873 292.761C102.412 275.149 87.722 250.64 82.3058 223.411C76.8895 196.182 81.0822 167.917 94.1694 143.432C107.257 118.948 128.429 99.7588 154.078 89.1345C179.727 78.5102 208.267 77.1081 234.834 85.1672C261.401 93.2262 284.352 110.248 299.776 133.332C315.2 156.415 322.143 184.133 319.422 211.762C318.047 225.729 314.244 239.236 308.284 251.716Z"/>
                        </svg>
                        <h1 className="ml-3 text-xl my-auto font-metrovancouver text-center hidden sm:block text-qhigh">Qwale</h1>
                    </Link>
                </div>
                <div className="ml-auto mr-5 md:mr-20">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <DropdownMenuItem itemText="Projects"/>
                            <DropdownMenuItem itemText="Corporate"/>
                            <StandaloneMenuItem itemText="Contact" href="/contact" />
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <Outlet/>
            <Toaster />
            <div className="py-2 px-4 h-[2.5rem] w-full flex content-center bg-opacity-5 bg-primary-foreground z-40">
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