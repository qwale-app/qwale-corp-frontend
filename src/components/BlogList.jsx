import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { useDispatch, useSelector } from 'react-redux'
import BlogDetails from './BlogDetails'
import Error from './Error'
import { useEffect, useState } from 'react'

import { setPage } from '../reducers/blogReducer'
import blogService from '../services/blog'

import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}

const PageBar = ({ page, max=1 }) => {
    return(
        <Pagination className="mb-6">
            <PaginationContent>
                <PaginationItem className={page<=1 && "hidden"}>
                    <PaginationPrevious to={`?page=${page-1}`} />
                </PaginationItem>

                <PaginationItem className={page<=2 && "hidden"}>
                    <PaginationLink to="?page=1">1</PaginationLink>
                </PaginationItem>

                <PaginationItem className={page<=3 && "hidden"}>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem className={page<=1 && "hidden"}>
                    <PaginationLink to={`?page=${page-1}`}>{page-1}</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink to={`?page=${page}`} isActive>
                        {page}
                    </PaginationLink>
                </PaginationItem>

                <PaginationItem className={page>=(max) && "hidden"}>
                    <PaginationLink to={`?page=${page+1}`}>{page+1}</PaginationLink>
                </PaginationItem>

                <PaginationItem className={page>=(max-2) && "hidden"}>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem className={page>=(max-1) && "hidden"}>
                    <PaginationLink to={`?page=${max}`}>{max}</PaginationLink>
                </PaginationItem>

                <PaginationItem className={page>=(max) && "hidden"}>
                    <PaginationNext to={`?page=${page+1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

const BlogList = () => {
    const query = useQuery()
    const dispatch = useDispatch()

    const myblogs = useSelector(({ blog }) => blog.all)

    const [resultcount, setResultcount] = useState({pages: 1, count: 0})

    const page = Number(query.get("page")) || 1

    useEffect(() => {
        document.title = "Qwale Corporate | Blog"
    }, [])

    useEffect(() => {
        blogService
            .getCount()
            .then(results => setResultcount(results))
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        
        blogService
            .getMetaPosts(page || 1)
            .then(viewableBlogs => dispatch(setPage(viewableBlogs)))
    }, [page])

    if(!myblogs) return <Error />

    return(
        <>
            <div className="h-full pt-20 xl:pb-24 min-h-[calc(100vh-2.5rem)]">
                <div className="flex flex-col pt-48 md:pt-64 sm:pt-52 md:pb-14 sm:pb-10 pb-24">
                    <h2 className="text-foreground text-4xl sm:text-6xl font-inter text-center mb-4 sm:mt-12 mx-4">Qwale Blog</h2>
                </div>
                
                {myblogs && myblogs.map(b => <BlogDetails key={b.id} blog={b} /> )}
                <PageBar page={page} max={resultcount.pages} />
            </div>
        </>
    )
}

export default BlogList