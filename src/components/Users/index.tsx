import * as React from "react";
import {List, Datagrid, TextField, EmailField, SearchInput, TextInput} from "react-admin";

const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Name" source="name" defaultValue="" />,
];

export const UserList = (props:any) => (
  <List {...props} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);