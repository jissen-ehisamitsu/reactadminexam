import * as React from "react";
import {List, Datagrid, TextField, EmailField, SearchInput, TextInput} from "react-admin";

const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Username" source="username" defaultValue="" />,
];

export const UserList = (props:any) => (
  <List {...props} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="address.street" />
      <TextField source="phone" />
      <TextField source="website" />
      <TextField source="company.name" />
    </Datagrid>
  </List>
);