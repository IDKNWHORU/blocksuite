"use client";

import { AffineSchemas } from "@blocksuite/blocks/models";
import { AffineEditorContainer, createEmptyPage } from "@blocksuite/presets";
import "@blocksuite/presets/themes/affine.css";
import { Job, Schema, Workspace } from "@blocksuite/store";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { newPost, updatePost, uploadImage } from "@/app/actions";
import { docSpecs } from "./custom-block";
import { useRouter } from "next/navigation";

export default function Editor({ content, id }) {
  const editorRef = useRef();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSaveButton = async () => {
    setPending(true);
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;

    const job = new Job({ workspace });

    const keys = await workspace.blob.list();

    if (keys.length > 0) {
      for (const key of keys) {
        const form = new FormData();
        const value = await workspace.blob.get(key);
        const file = new File([value], key, { type: value.type });

        form.append("image", file);
        await uploadImage(form, key);
      }
    }

    if (id == null) {
      await newPost(
        page.meta.title,
        JSON.stringify(await job.pageToSnapshot(page))
      );
    } else {
      await updatePost(
        id,
        page.meta.title,
        JSON.stringify(await job.pageToSnapshot(page))
      );
    }

    setPending(false);
    router.back();
    router.refresh();
  };

  useEffect(() => {
    const getEditor = async () => {
      const schema = new Schema().register(AffineSchemas);
      const workspace = new Workspace({ schema });

      const editor = new AffineEditorContainer();
      editor.docSpecs = docSpecs;

      if (Object.keys(content).length > 0) {
        const job = new Job({ workspace });

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
      <button onClick={handleSaveButton} disabled={pending}>
        {pending ? "저장 중입니다." : "저장하기"}
      </button>
      <div ref={editorRef} />
    </>
  );
}
