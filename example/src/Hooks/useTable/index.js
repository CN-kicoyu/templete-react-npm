import { useState, useEffect, useMemo, useCallback } from 'react'
import { Table, Pagination } from 'antd'

class InitProps {
  current = 1
  pageSize = 10
  total = 0
  dataSource = []
  count = 0
}

function useTable(dataSource, options = {}) {
  const isDataFunc = typeof dataSource === 'funciton'
  const initProps = !isDataFunc ? {dataSource} : useMemo(() => new InitProps(), [])
  const { defaultPageSize = 10, formatResult } = options
  const [state, setState] = useState({
    ...initProps,
    pageSize: defaultPageSize
  })
  const fetchData = useCallback(
    (...args) =>
      fn(...args)
        .then(data => (formatResult ? formatResult(data) : data))
        .catch(error => {
          throw error
        }),
    [formatResult]
  )

  const refresh = useCallback(
    () => {
      console.log('33333')
      setState(({ count, ...prevState }) => ({ ...prevState, count: count + 1 }))
    },
    []
  )

  useEffect(() => {
    refresh()
    return () => {}
  }, [refresh])

  useEffect(() => {
    if (!isDataFunc) return
    const parmas = {
      current: state.current,
      pageSize: state.pageSize
    }

    fetchData(parms).then(res => setValue(res))
  }, [state.pageSize, state.count, isDataFunc, state, fetchData])

  const setDataSource = (dataSource) => setState({
    ...initProps,
    dataSource
  })

  return [state, setDataSource, refresh]
}

export default useTable
