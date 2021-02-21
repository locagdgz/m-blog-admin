import request from './request'

export function listArticleType(id, userName) {
    return request({
        url: "/articleType/listArticleType",
        params: {
            id,
            userName
        }
    })
}
