import request from '@/utils/request'

// 集中式路线规划
export function route(query) {
    return request({
        url: '/managedrone/simulate/route',
        method: 'post',
        params: query
    })
}