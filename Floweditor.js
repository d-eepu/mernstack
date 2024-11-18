import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import axios from "../services/api";

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [flowName, setFlowName] = useState("");

  const handleSaveFlow = async () => {
    const flowData = { name: flowName, nodes, edges };
    await axios.post("/save-flow", flowData);
    alert("Flow saved successfully!");
  };

  const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

  return (
    <div style={{ height: "100vh" }}>
      <input
        type="text"
        placeholder="Flow Name"
        value={flowName}
        onChange={(e) => setFlowName(e.target.value)}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <button onClick={handleSaveFlow}>Save Flow</button>
    </div>
  );
};

export default FlowEditor;
