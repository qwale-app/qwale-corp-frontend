import axios from 'axios'
const baseUrl = '/api/corporate/team'
const imgBaseUrl = '/api/corporate/img'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}
const logoutToken = () => {
    token = null
}
const getToken = () => {
    return token
}

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const resetSend = async id => {
    await axios.post(`${baseUrl}/${id}/reset/send`)
}

const resetPassword = async (resetToken, user, newPassword) => {
    const config = {
        headers: { Authorization: `Bearer ${resetToken}` },
    }

    await axios.post(`${baseUrl}/${user}/reset`, { newPassword }, config)
}

const updateName = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${id}/name`, newObject, config)
    return request.then(response => response.data)
}

const setImg = async(id, newObject) => {
    const config = {
        headers: { Authorization: token, "Content-Type" : "multipart/form-data" },
    }

    const response = await axios.put(`${imgBaseUrl}/${id}`, newObject, config)
    return response.data
}

const getImg = (id) => {
    const request = `${imgBaseUrl}/${id}`
    return request
}

const updateDesc = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${id}/desc`, newObject, config)
    return request.then(response => response.data)
}

const updateMisc = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${id}/misc`, newObject, config)
    return request.then(response => response.data)
}

const updateSocial = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${id}/social`, newObject, config)
    return request.then(response => response.data)
}

const updateAll = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.then(response => response.data)
}

const deleteUser = id => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

const removePosition = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${id}/positions`, newObject, config)
    return request.then(response => response.data)
}

export default { resetSend, resetPassword, getAll, create, updateName, setImg, setToken, getToken, logoutToken, updateMisc, deleteUser, updateSocial, updateAll, updateDesc, removePosition, getImg }