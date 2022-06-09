import * as React from "react";
import {Admin, Resource} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import {UserList} from "../src/components/Users";
import {PostList} from "../src/components/Posts";
import authProvider from "../src/providers/Auth";
import "./App.css";
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      <Resource name="posts" list={PostList} />
      <Resource name="users" list={UserList} />
    </Admin>
  );
};

export default App;
