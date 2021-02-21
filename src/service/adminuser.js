import request from './request'

export function login(userName, password) {
    return request({
        method: "POST",
        url: "/admin/login",
        data: {
            userName,
            password
        }
    })
}

export function checkLoginStatus(id, userName) {
    return request({
        method: "POST",
        url: "/admin/checkLoginStatus",
        data: {
            id,
            userName
        }
    })
}