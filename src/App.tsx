import * as React from "react";
import {Admin, Resource} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import {UserList} from "../src/components/Users";
import {PostList} from "../src/components/Posts";
import { MyLayout } from '../src/devtools';
import authProvider from "../src/providers/Auth";
import "./App.css";
const dataProvider = jsonServerProvider("https://my-json-server.typicode.com/jissen-ehisamitsu/reactadminexam");

const App = () => {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      <Resource name="posts" list={PostList} />
      <Resource name="users" list={UserList} />
    </Admin>
  );
};

export default App;
