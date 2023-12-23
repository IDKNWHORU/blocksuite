"use client";

import "@blocksuite/presets/themes/affine.css";
import { createEmptyPage, DocEditor } from "@blocksuite/presets";
import { useEffect, useRef, useState } from "react";
import { ZipTransformer } from "@blocksuite/blocks";
import { Job } from "@blocksuite/store";

export default function Editor() {
  const editorRef = useRef();
  const [snapshot, setSanpshot] = useState();
  const [blob, setBlob] = useState();
  const [pages, setPages] = useState([]);

  const handleSaveButton = async () => {
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;

    setBlob(
      await ZipTransformer.exportPages(workspace, [...workspace.pages.values()])
    );
  };

  const handleLoadButton = async () => {
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;

    await ZipTransformer.importPages(workspace, blob);
    console.log(workspace.pages);
  };

  const handleCheckPages = () => {
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;
    console.log(workspace.pages.values());
  };

  const handleUpdatePage1 = () => {
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;

    const iterator = workspace.pages.values();
    const firstPage = iterator.next();

    editor.page = firstPage.value;
    editor.requestUpdate();
  };

  const handleUpdatePage2 = async () => {
    const editor = editorRef.current.instance;
    const page = editor.page;
    const workspace = page.workspace;

    const iterator = workspace.pages.values();
    const firstPage = iterator.next();
    const secondPage = iterator.next();

    editor.page = secondPage.value;
    console.log(secondPage.value);
    await secondPage.value.load();
    editor.requestUpdate();
  };

  useEffect(() => {
    if (editorRef.current.instance != null) return;

    const page = createEmptyPage().init();
    const editor = new DocEditor();
    editor.page = page;

    setPages([{ id: page.id, title: page.meta.title }]);

    editorRef.current.appendChild(editor);
    editorRef.current.instance = editor;
  }, []);

  const handleUpdatePage = (pageId) => {
    console.log(pageId);
  }

  return (
    <>
      {pages.map(({ id, title }) => (
        <button key={id} onClick={()=>{handleUpdatePage(id)}}>{title === "" ? "untitled" : title}</button>
      ))}
      <button onClick={handleSaveButton}>저장하기</button>
      <button onClick={handleLoadButton}>불러오기</button>
      <button onClick={handleCheckPages}>페이지 확인하기</button>
      <button onClick={handleUpdatePage1}>1번재</button>
      <button onClick={handleUpdatePage2}>2번째</button>
      <div ref={editorRef} />
    </>
  );
}
