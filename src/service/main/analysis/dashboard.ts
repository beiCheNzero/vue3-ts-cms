import ljlRequest from '@/service'

// 枚举
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCatetoryGoodsCount() {
  return ljlRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCatetoryGoodsSale() {
  return ljlRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCatetoryGoodsFavor() {
  return ljlRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return ljlRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
