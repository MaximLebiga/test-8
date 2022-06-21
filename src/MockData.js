export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render(text, record) {
      return {
        children: (
          <div
            style={{
              height: '68px'
            }}
          >
            {text}
          </div>
        )
      }
    }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    render(text, record) {
      return {
        children: (
          <div
            style={{
              height: '68px'
            }}
          >
            {text}
          </div>
        )
      }
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render(text, record) {
      return {
        children: (
          <div
            style={{
              height: '68px'
            }}
          >
            {text}
          </div>
        )
      }
    }
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render(text, record) {
      return {
        children: (
          <div
            style={{
              height: '68px'
            }}
          >
            {text}
          </div>
        )
      }
    }
  }
]

export const values = ['Jack', 'Marie', 'Michael']