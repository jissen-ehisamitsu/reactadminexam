import * as React from "react";
import {Admin, Resource} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import {Patients} from "../src/components/Patients";
import {Appointments} from "../src/components/Appointments";
import { MyLayout } from '../src/devtools';
import authProvider from "../src/providers/Auth";
import "./App.css";
const dataProvider = jsonServerProvider("https://my-json-server.typicode.com/jissen-ehisamitsu/reactadminexam");

const App = () => {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      <Resource name="patients" list={Patients} />
      <Resource name="appointments" list={Appointments} />
    </Admin>
  );
};

export default App;
