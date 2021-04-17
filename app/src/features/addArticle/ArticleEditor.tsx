import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import tw, { styled } from 'twin.macro';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { Button } from '../../components/Button';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const ArticleStylesWrapper = styled.div`
  h1 {
    ${tw`text-4xl`}
  }
  h2 {
    ${tw`text-3xl`}
  }
  h3 {
    ${tw`text-2xl`}
  }
  h4 {
    ${tw`text-xl`}
  }
  h5 {
    ${tw`text-lg`}
  }
  h6 {
    ${tw`text-base`}
  }
  blockquote {
    ${tw`border-l-2 border-gray-300 pl-4`}
  }
  .public-DraftStyleDefault-pre {
    ${tw`border border-gray-300 px-2 py-1 rounded`}
  }
  .DraftEditor-editorContainer {
    min-height: 250px;
    ${tw`mt-2`}
  }
`;

interface StyleButtonProps {
  active: boolean;
  label: string;
  onToggle: (style: string) => void;
  style: string;
}

function StyleButton(props: StyleButtonProps) {
  const { active, label, onToggle, style } = props;
  return (
    <span
      css={[
        tw`mx-1 border border-gray-300 p-1 rounded hover:( cursor-pointer ) `,
        active && tw`bg-gray-100`,
      ]}
      onMouseDown={e => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
}

interface BlockStyleControlsProps {
  editorState: EditorState;
  onToggle: (blockType: string) => void;
}

const BlockStyleControls = (props: BlockStyleControlsProps) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div css={tw`-mx-1`}>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export function ArticleEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div>
      <div css={tw`py-8 px-4 bg-white`}>
        <BlockStyleControls
          editorState={editorState}
          onToggle={blockType => {
            setEditorState(RichUtils.toggleBlockType(editorState, blockType));
          }}
        />
        <ArticleStylesWrapper>
          <Editor editorState={editorState} onChange={setEditorState} />
        </ArticleStylesWrapper>
      </div>

      <div css={tw`border-t border-gray-200 flex justify-end p-4`}>
        <Button
          type="primary"
          onClick={() => {
            const content = editorState.getCurrentContent();
            const rawObject = convertToRaw(content);
            const markdown = draftToMarkdown(rawObject);
          }}
        >
          Przejdź dalej
        </Button>
      </div>
    </div>
  );
}
