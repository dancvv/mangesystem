import request from '@/utils/request'

// 查询文件信息列表
export function listFileinfo(query) {
  return request({
    url: '/managedrone/fileinfo/list',
    method: 'get',
    params: query
  })
}

// 查询文件信息详细
export function getFileinfo(fileId) {
  return request({
    url: '/managedrone/fileinfo/' + fileId,
    method: 'get'
  })
}

// 新增文件信息
export function addFileinfo(data) {
  return request({
    url: '/managedrone/fileinfo',
    method: 'post',
    data: data
  })
}

// 修改文件信息
export function updateFileinfo(data) {
  return request({
    url: '/managedrone/fileinfo',
    method: 'put',
    data: data
  })
}

// 删除文件信息
export function delFileinfo(fileId) {
  return request({
    url: '/managedrone/fileinfo/' + fileId,
    method: 'delete'
  })
}

// 删除文件具体
export function delFileinfoDetail(filePath) {
  return request({
    url: '/file/delete',
    method: 'delete',
    params: {
      filePath:filePath
    }
  })
}
