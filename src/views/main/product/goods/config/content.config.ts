export const contentTableConfig = {
  title: '商品列表',
  // 是否显示序号
  showIndexColumn: true,
  // 是否显示全选功能
  showSelectColumn: true,
  propList: [
    {
      prop: 'name',
      label: '商品名称',
      minWidth: '100'
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '40'
    },
    {
      prop: 'newPrice',
      label: '新价格',
      minWidth: '40'
    },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '100',
      slotName: 'image'
    },
    {
      prop: 'desc',
      label: '商品描述',
      minWidth: '150'
    },
    {
      prop: 'status',
      label: '商品状态',
      minWidth: '60',
      slotName: 'status'
    },
    {
      prop: 'address',
      label: '地址',
      minWidth: '60'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '90',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '90',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '150',
      slotName: 'handler'
    }
  ]
}
