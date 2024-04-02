import teamService from './team'
import axios from 'axios'
const baseUrl = 'https://corpapi.qwale.ca/api/corporate/blog'

const getMetaPosts = async(pageNum) => {
    const response = await axios.get(`${baseUrl}/page/${pageNum || 1}`, { pageNum })
    return response.data
}

const getCount = async () => {
    const response = await axios.get(`${baseUrl}/count`)
    return response.data
}

const getOwnedPosts = async() => {
    const config = {
        headers: { Authorization: teamService.getToken() },
    }

    try {
        const drafts = await axios.get(`${baseUrl}/drafts`, config)
        return drafts.data
    } catch {
        return ([])
    }
}

const getSpecificPost = async(id, curtok) => {
    const config = {
        headers: { Authorization: (curtok && `Bearer ${curtok}`) || teamService.getToken() || null },
    }
  
    try{
        const response = await axios.get(`${baseUrl}/b/${id}`, config)
        return response.data
    } catch(e) {
        console.log("Could Not Find Blog Post (is it private?)")
        return null
    }
}

const updateContent = async(id, newObject) => {
    const config = {
        headers: { Authorization: teamService.getToken() },
    }

    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

const updatePost = async(id, newObject) => {
    const config = {
        headers: { Authorization: teamService.getToken() },
    }

    const response = await axios.put(`${baseUrl}/${id}/force`, newObject, config)
    return response.data
}

const deletePost = async(id) => {
    const config = {
        headers: { Authorization: teamService.getToken() },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const createPost = async(newObject) => {
    const config = {
        headers: { Authorization: teamService.getToken() },
    }

    const response = await axios.post(`${baseUrl}`, newObject, config)
    return response.data
}

export default { createPost, getMetaPosts, getOwnedPosts, getSpecificPost, updateContent, updatePost, deletePost, getCount }