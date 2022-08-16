type IFormType = 'input' | 'password' | 'select' | 'detepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对options
  options?: any[]
  // 针对其他的选项的
  otherOptions?: any
  isHidden?: boolean
}

export interface IFormStyle {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
  modelTitle?: string
}
