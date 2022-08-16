import { ref } from 'vue'
import PageModel from '@/components/page-model'

type CallbackFn = (item?: any) => void

export function usePageModel(newCallback?: CallbackFn, editCallback?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCallback && newCallback()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCallback && editCallback(item)
  }

  return [pageModelRef, defaultInfo, handleNewData, handleEditData]
}
