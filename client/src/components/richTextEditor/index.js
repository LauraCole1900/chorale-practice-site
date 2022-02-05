import { Component } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";


class EditorContainer extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = props.value
      ? {
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)))
      }
      : {
        editorState: EditorState.createEmpty()
      };
    this.name = props.name;
    this.value = props.value;
    this.onChange = props.onChange
  }

  // Handles input changes to editor form
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.onChange(this.name, editorState)
  };

  // Defines options to render
  render() {
    const { editorState } = this.state;
    return <div className='editor richTextEditor'>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        toolbarClassName="gcToolbar"
        toolbar={{
          options: ["inline", "blockType", "fontSize", "fontFamily", "list", "textAlign", "link", "colorPicker", "history"],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline", "strikethrough"]
          },
          list: {
            inDropdown: false,
            options: ["unordered", "ordered"]
          },
          textAlign: { inDropdown: false },
          link: { inDropdown: false },
          history: { inDropdown: false }
        }}
      />
    </div>
  }
};

export default EditorContainer;