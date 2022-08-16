import { IFormStyle } from '@/base-ui/form'

export const modelConfig: IFormStyle = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {
    padding: '0px 0px'
  },
  modelTitle: '新建角色'
}
