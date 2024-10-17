import React from "react";
import { Layout } from "./src/pages/_Layout";
import "./ignoreWarnings";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

export default function App() {
  return <Layout />;
}
