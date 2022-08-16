export const contentTableConfig = {
  propList: [
    {
      prop: 'name',
      label: '角色名',
      minWidth: '70'
    },
    {
      prop: 'intro',
      label: '权限介绍',
      minWidth: '70'
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
  title: '角色列表',
  // 是否显示序号
  showIndexColumn: true,
  // 是否显示全选功能
  showSelectColumn: true,
  btnTitle: '新建角色'
}
