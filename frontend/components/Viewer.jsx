"use client";

import { AffineSchemas } from "@blocksuite/blocks/models";
import { AffineEditorContainer, createEmptyPage } from "@blocksuite/presets";
import "@blocksuite/presets/themes/affine.css";
import { Job, Schema, Workspace } from "@blocksuite/store";
import { useEffect, useRef } from "react";
import "./style.css";
import { getImage } from "@/app/actions";

export default function Viewer({ content }) {
  const editorRef = useRef();

  useEffect(() => {
    const getEditor = async () => {
      const schema = new Schema().register(AffineSchemas);
      const workspace = new Workspace({ schema });

      const editor = new AffineEditorContainer();

      const job = new Job({ workspace });

      const assets = content.blocks.children[1].children.filter(
        ({ props }) => props.sourceId != null && props.sourceId !== ""
      );

      for (const {
        props: { sourceId },
      } of assets) {
        const url = await getImage(sourceId);
        const blob = await (await fetch(url)).blob();
        const value = new File([blob], sourceId, { type: blob.type });

        job.assets.set(sourceId, value);
      }

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
