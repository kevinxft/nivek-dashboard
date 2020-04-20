import React from "react"

import {
  List,
  Datagrid,
  TextField,
  DateField,
  SimpleForm,
  TextInput,
  Create,
  Filter,
  Edit,
} from "react-admin"

const ZaunFilter = (props) => (
  <Filter {...props}>
    <TextInput label="id" source="id" />
    <TextInput label="内容" source="content" />
  </Filter>
)

export const ZaunList = (props) => (
  <List
    title="祖安文化"
    sort={{ field: "created", order: "DESC" }}
    {...props}
    filters={<ZaunFilter />}
  >
    <Datagrid rowClick="edit">
      <TextField source="id"></TextField>
      <TextField source="content"></TextField>
      <DateField source="created"></DateField>
      <DateField source="updated"></DateField>
    </Datagrid>
  </List>
)

export const ZaunCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="content"></TextInput>
    </SimpleForm>
  </Create>
)

export const ZaunEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="ID" source="id"></TextInput>
      <TextInput label="内容" source="content"></TextInput>
    </SimpleForm>
  </Edit>
)
