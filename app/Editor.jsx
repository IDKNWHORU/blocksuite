"use client";

import { AffineSchemas } from '@blocksuite/blocks/models';
import { createEmptyPage, DocEditor } from "@blocksuite/presets";
import "@blocksuite/presets/themes/affine.css";
import { Job, Schema, Workspace } from "@blocksuite/store";
import { useEffect, useRef } from "react";
import { create } from "./actions";
import "./style.css";

export default function Editor({ content }) {
  const editorRef = useRef();

  const handleSaveButton = async () => {
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;

    const job = new Job({workspace});

    await create(await job.pageToSnapshot(page));
  };

  useEffect(() => {
    const getEditor = async () => {
      const schema = new Schema().register(AffineSchemas);
      const workspace = new Workspace({ schema });
  
      const job = new Job({workspace});

      const editor = new DocEditor();

      if(Object.keys(content).length > 0) {
        const page = await job.snapshotToPage(content);
        editor.page = page;
      } else {
        const page = createEmptyPage().init();
        editor.page = page;
      }
  
      if(editorRef.current.children.length === 0) {
        editorRef.current.appendChild(editor);
        editorRef.current.instance = editor;
      }
    }

    getEditor();
  }, []);

  return (
    <>
      <button onClick={handleSaveButton}>save document</button>
      <button onClick={() => {location.reload()}}>refresh page</button>
      <div ref={editorRef} />
    </>
  );
}
