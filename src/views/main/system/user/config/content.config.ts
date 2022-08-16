export const contentTableConfig = {
  propList: [
    {
      prop: 'name',
      label: '用户名',
      minWidth: '70'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '70'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '90'
    },
    {
      prop: 'enable',
      label: '状态',
      minWidth: '50',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '130',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '130',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '100px',
      slotName: 'handler'
    }
  ],
  // 用户列表
  title: '用户列表',
  // 是否显示序号
  showIndexColumn: true,
  // 是否显示全选功能
  showSelectColumn: true,
  btnTitle: '新建用户'
}
