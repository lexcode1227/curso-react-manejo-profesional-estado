import React from "react";
import { UseState } from "./UseState";
import { ClassState } from "./ClassState";

function App() {
  return (
    <div className="App-">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  );
}
export { App };