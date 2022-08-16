export const contentTableConfig = {
  title: '菜单管理',
  // 是否显示序号
  showIndexColumn: false,
  // 是否显示全选功能
  showSelectColumn: false,
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '100'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '50'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '100'
    },
    {
      prop: 'icon',
      label: '图片',
      minWidth: '100'
    },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '150',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '150',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '100px',
      slotName: 'handler'
    }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  // 不展示分页器
  showFooter: false
}
