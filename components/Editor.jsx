"use client";

import { AffineSchemas } from "@blocksuite/blocks/models";
import { AffineEditorContainer, createEmptyPage } from "@blocksuite/presets";
import "@blocksuite/presets/themes/affine.css";
import { Job, Schema, Workspace } from "@blocksuite/store";
import { useEffect, useRef } from "react";
// import { create } from "./actions";
import "./style.css";

export default function Editor({ content }) {
  const editorRef = useRef();

  const handleSaveButton = async () => {
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;

    const job = new Job({ workspace });

    const keys = await workspace.blob.list();

    if (keys.length > 0) {
      const form = new FormData();

      for (const key of keys) {
        const value = await workspace.blob.get(key);
        const file = new File([value], key, { type: value.type });

        form.append("files", file);
      }

      await fetch("http://localhost:8080/make/file", {
        method: "POST",
        body: form,
      });
    }

    const contentForm = new FormData();
    contentForm.append("title", page.meta.title);
    contentForm.append(
      "content",
      JSON.stringify(await job.pageToSnapshot(page))
    );

    await fetch("http://localhost:8080/blog", {
      method: "POST",
      body: contentForm,
    });
    // await create(await job.pageToSnapshot(page));
  };

  useEffect(() => {
    const getEditor = async () => {
      const schema = new Schema().register(AffineSchemas);
      const workspace = new Workspace({ schema });

      // const editor = new DocEditor();
      const editor = new AffineEditorContainer();
      // editor.docSpecs = docSpecs;

      if (Object.keys(content).length > 0) {
        const job = new Job({ workspace });

        // const assets = await (await fetch("http://localhost:8080/make/file")).json();
        // for(const key of assets) {
        //   const blob = await (await fetch(`http://localhost:8080/make/file/${key}`)).blob();
        //   const value = new File([blob], key, { type: blob.type });

        //   job.assets.set(key, value);
        // }

        const page = await job.snapshotToPage(content);
        editor.page = page;
      } else {
        const page = createEmptyPage().init();
        editor.page = page;
      }

      if (editorRef.current.children.length === 0) {
        editorRef.current.appendChild(editor);
        editorRef.current.instance = editor;
      }
    };

    getEditor();
  }, []);

  return (
    <>
      <button onClick={handleSaveButton}>save document</button>
      {/* <button
        onClick={() => {
          const { page } = editorRef.current.instance;

          page.awarenessStore.setReadonly(page, !page.readonly);
        }}
      >
        toggle readonly
      </button> */}
      <div ref={editorRef} />
    </>
  );
}
