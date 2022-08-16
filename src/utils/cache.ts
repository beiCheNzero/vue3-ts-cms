// 封装本地缓存
class LocalCache {
  setCatch(key: string, value: any) {
    // 通过JSON.stringify转成字符串
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCatch(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key)
    if (value) {
      // 通过JSON.parse转回成原来的类型
      return JSON.parse(value)
    }
  }

  // 删除缓存
  deleteCatch(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空缓存
  clearCatch() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
