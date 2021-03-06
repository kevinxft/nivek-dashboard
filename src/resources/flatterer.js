import React from "react"
import {
  List,
  Datagrid,
  TextField,
  DateField ,
  SimpleForm,
  TextInput,
  Create,
  Filter,
  Edit,
  Show,
  SimpleShowLayout,
} from "react-admin"

const FlattererFilter = (props) => (
  <Filter {...props}>
    <TextInput label="id" source="id" />
    <TextInput label="内容" source="content" />
  </Filter>
)

export const FlattererList = (props) => (
  <List
    title="舔狗语录"
    sort={{ field: "created", order: "DESC" }}
    {...props}
    filters={<FlattererFilter />}
  >
    <Datagrid rowClick="edit">
      <TextField source="id"></TextField>
      <TextField source="content"></TextField>
      <DateField source="created"></DateField>
      <DateField source="updated"></DateField>
    </Datagrid>
  </List>
)

export const FlattererCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="content"></TextInput>
      <TextInput source="desc"></TextInput>
    </SimpleForm>
  </Create>
)

export const FlattererEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label="ID" source="id"></TextInput>
      <TextInput label="内容" source="content"></TextInput>
      <TextInput source="desc"></TextInput>
    </SimpleForm>
  </Edit>
)

export const FlattererShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id"></TextField>
      <TextField source="content"></TextField>
      <TextField source="desc"></TextField>
    </SimpleShowLayout>
  </Show>
)
