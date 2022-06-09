import * as React from "react";
import {List, Datagrid, TextField, ReferenceField, SearchInput, TextInput} from "react-admin";

const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput label="Username" source="username" defaultValue="" />,
];

export const PostList = (props:any) => (
  <List {...props} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
    </Datagrid>
  </List>
);