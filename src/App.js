import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { theme } from "./theme";
import { Placeholder } from "./Placeholder";
import styles from "./App.module.css";
import SampleData from "./sample-default.json";
import { CustomDragPreview } from "./CustomDragPreview";
import {useEffect} from 'react'

function App() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => {
    console.log('Item has been dropped'+new Date()+'>>>>'+new Date().getTime()   );
    console.log('Below is the new Tree array structure')
    console.log(newTree)
    setTreeData(newTree);
  }
  useEffect(()=>{
    const webgazer=window.webgazer
    webgazer.setGazeListener((data,clock)=>{
      console.log(data,clock)
    }).begin()
  },[])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app}>
          <Tree
            tree={treeData}
            rootId={0}
            render={(node, { depth, isOpen, onToggle }) => (
              <CustomNode
                node={node}
                depth={depth}
                isOpen={isOpen}
                onToggle={onToggle}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              placeholder: styles.placeholderContainer
            }}
            sort={false}
            insertDroppableFirst={false}
            canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
              if (dragSource?.parent === dropTargetId) {
                return true;
              }
            }}
            dropTargetOffset={5}
            placeholderRender={(node, { depth }) => (
              <Placeholder node={node} depth={depth} />
            )}
          />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
