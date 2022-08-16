import ljlRequest from '@/service'
import { IDataType } from '@/service/types'

// 获取数据
export function getPageListData(url: string, queryInfo: any) {
  return ljlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除数据
// url: /users/id
export function deletePageList(url: string) {
  return ljlRequest.delete<IDataType>({
    url: url
  })
}

// 添加数据
export function createPageData(url: string, newData: any) {
  return ljlRequest.post<IDataType>({
    url,
    data: newData
  })
}

// 编辑数据
export function editPageData(url: string, editData: any) {
  return ljlRequest.patch<IDataType>({
    url,
    data: editData
  })
}
