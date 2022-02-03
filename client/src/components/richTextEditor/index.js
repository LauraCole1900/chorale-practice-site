import { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";

class EditorContainer extends Component {
  constructor(props) {
    super(props);
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

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.onChange(this.name, editorState)
  };

  render() {
    const { editorState } = this.state;
    return <div className='editor richTextEditor'>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true }
        }}
      />
    </div>
  }
};

export default EditorContainer;