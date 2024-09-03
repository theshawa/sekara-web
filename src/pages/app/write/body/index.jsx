import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  AccessibilityHelp,
  Autoformat,
  AutoLink,
  Autosave,
  BalloonEditor,
  BlockQuote,
  Bold,
  CodeBlock,
  Essentials,
  FindAndReplace,
  Heading,
  Highlight,
  HorizontalLine,
  Italic,
  Link,
  List,
  Paragraph,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  Strikethrough,
  Subscript,
  Superscript,
  TextTransformation,
  Underline,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

import "./styles.css";

export const Body = ({ content, setContent }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = useMemo(
    () => ({
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "findAndReplace",
          "selectAll",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "subscript",
          "superscript",
          "removeFormat",
          "|",
          "specialCharacters",
          "horizontalLine",
          "link",
          "highlight",
          "blockQuote",
          "codeBlock",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "accessibilityHelp",
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Autoformat,
        AutoLink,
        Autosave,
        BlockQuote,
        Bold,
        CodeBlock,
        Essentials,
        FindAndReplace,
        Heading,
        Highlight,
        HorizontalLine,
        Italic,
        Link,
        Paragraph,
        RemoveFormat,
        SelectAll,
        SpecialCharacters,
        Strikethrough,
        Subscript,
        Superscript,
        TextTransformation,
        Underline,
        Undo,
        List,
      ],
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      initialData: content,
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },
      placeholder: "What’s on your mind? Start writing...",
    }),
    [content]
  );

  return (
    <div className="w-full font-inter prose max-w-screen-sm mx-auto prose-blue">
      <div className="w-full font-inter" ref={editorContainerRef}>
        <div className="w-full font-inter">
          <div ref={editorRef}>
            {isLayoutReady && (
              <CKEditor
                editor={BalloonEditor}
                config={editorConfig}
                onChange={(_, editor) => {
                  setContent(editor.getData());
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
