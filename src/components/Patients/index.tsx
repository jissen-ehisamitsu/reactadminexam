import * as React from "react";
import {List, Datagrid, TextField, ReferenceField, SearchInput, TextInput} from "react-admin";

const postFilters = [
  <SearchInput source="q" alwaysOn />
];

export const Patients = (props:any) => (
  <List {...props} filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="Name" />
      <TextField source="Birthday" />
      <TextField source="Gender" />
      <TextField source="Contact" />
      <TextField source="Contact Detail" />
      <TextField source="Insuarance Tpe" />
    </Datagrid>
  </List>
);