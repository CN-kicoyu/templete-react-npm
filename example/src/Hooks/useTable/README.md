### useTable

#### 使用方式

```js
// 无初始值的table
const [tableProps, setTableProps, refreshTable] = useTable()

// 含有初始值的table
const dataSource = [{
  title: 'test1',
  id: 1
},{
  title: 'test2',
  id: 2
},{
  title: 'test3',
  id: 3
}]
const [tableProps, setTableProps, refreshTable] = useTable(dataSource)

// table 数据的请求
const getDataSource = ({ current, pageSize }) => {
  // ...
  return fetch(`xxxx?page=${current}pageSize=${pageSize}`).then(res => res.json()).then(res => {
    total: res.total,
    data: res.data,
  })
}
const [tableProps, setTableProps, refreshTable] = useTable(getDataSource)

// 格式化 table 数据
const getDataSource = ({ current, pageSize }) => fetch(`xxxx?page=${current}pageSize=${pageSize}`)
const formatResult = (res) => {
  total: res.total,
  data: res.data
})
const [tableProps, setTableProps, refreshTable] = useTable(getDataSource, formatResult)

// 结合 table
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Id',
    dataIndex: 'id',
  }
];
function Demo () {
  return <Table
    columns={columns}
    {...tableProps}
    pagination={{
      ...tableProps.pagination,
      showQuickJumper: true,
      showSizeChanger: true,
    }}
  />
}
```
