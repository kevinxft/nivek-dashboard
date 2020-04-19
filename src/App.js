import React from 'react'
import { Admin, Resource } from 'react-admin'
import {
  FlattererList,
  FlattererCreate,
  FlattererEdit,
} from './resources/flatterer'
import dataProvider from './dataProvider'

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="flatterer"
      list={FlattererList}
      create={FlattererCreate}
      edit={FlattererEdit}
    ></Resource>
  </Admin>
)

export default App
