"use client";

import { AffineSchemas } from "@blocksuite/blocks/models";
import { AffineEditorContainer, createEmptyPage } from "@blocksuite/presets";
import "@blocksuite/presets/themes/affine.css";
import { Job, Schema, Workspace } from "@blocksuite/store";
import { useEffect, useRef } from "react";
import "./style.css";

export default function Viewer({ content }) {
  const editorRef = useRef();

  useEffect(() => {
    const getEditor = async () => {
      const schema = new Schema().register(AffineSchemas);
      const workspace = new Workspace({ schema });

      const editor = new AffineEditorContainer();

      const job = new Job({ workspace });

      // const assets = await (await fetch("http://localhost:8080/make/file")).json();
      // for(const key of assets) {
      //   const blob = await (await fetch(`http://localhost:8080/make/file/${key}`)).blob();
      //   const value = new File([blob], key, { type: blob.type });

      //   job.assets.set(key, value);
      // }

      const page = await job.snapshotToPage(content);
      page.awarenessStore.setReadonly(page, !page.readonly);

      editor.page = page;

      if (editorRef.current.children.length === 0) {
        editorRef.current.appendChild(editor);
        editorRef.current.instance = editor;
      }
    };

    getEditor();
  }, []);

  return <div ref={editorRef} />;
}
