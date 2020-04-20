import React from "react"
import { Admin, Resource } from "react-admin"
import {
  FlattererList,
  FlattererCreate,
  FlattererEdit,
  FlattererShow,
} from "./resources/flatterer"
import { ZaunList, ZaunCreate, ZaunEdit } from "./resources/zaun"
import dataProvider from "./dataProvider"
import { authProvider } from "./authProvider"

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource
      name="flatterer"
      options={{ label: "舔狗语录" }}
      list={FlattererList}
      create={FlattererCreate}
      edit={FlattererEdit}
      show={FlattererShow}
    ></Resource>
    <Resource
      name="zaun"
      options={{ label: "祖安文化" }}
      list={ZaunList}
      create={ZaunCreate}
      edit={ZaunEdit}
    ></Resource>
  </Admin>
)

export default App
