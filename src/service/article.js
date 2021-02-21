import request from './request'

export function saveArticle(userId, userName,saveFlag, article) {
    return request({
        method: "POST",
        url: "/article/saveArticle",
        data: {
            userId,
            userName,
            saveFlag,
            article
        }
    })
}
export function updateArticle(userId, userName,saveFlag, article) {
    return request({
        method: "POST",
        url: "/article/updateArticle",
        data: {
            userId,
            userName,
            saveFlag,
            article
        }
    })
}

export function listArticle(pageNo, pageSize) {
    return request({
        url: "/article/listArticle",
        params: {
            pageNo,
            pageSize
        }
    })
}

export function delArticleById(userId, userName, article) {
    return request({
        method: "POST",
        url: "/article/delArticleById",
        data: {
            userId,
            userName,
            article
        }
    })
} 

export function getArticle(id) {
    return request({
        url: "/article/get/" + id
    })
}