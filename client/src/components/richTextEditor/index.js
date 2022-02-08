import { Component } from "react";
import { convertFromRaw, EditorState, Modifier, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";


const styleMap = {
  "fontsize-8": {
    fontSize: 8
  },
  "fontsize-9": {
    fontSize: 9
  },
  "fontsize-10": {
    fontSize: 10
  },
  "fontsize-11": {
    fontSize: 11
  },
  "fontsize-12": {
    fontSize: 12
  },
  "fontsize-14": {
    fontSize: 14
  },
  "fontsize-16": {
    fontSize: 16
  },
  "fontsize-18": {
    fontSize: 18
  },
  "fontsize-24": {
    fontSize: 24
  },
  "fontsize-30": {
    fontSize: 30
  },
  "fontsize-36": {
    fontSize: 36
  },
  "fontsize-48": {
    fontSize: 48
  },
  "fontsize-60": {
    fontSize: 60
  },
  "fontsize-72": {
    fontSize: 72
  },
  "fontsize-96": {
    fontSize: 96
  },
  "color-rgb(0,0,0)": {
    color: "rgb(0, 0, 0)"
  },
  "color-rgb(26,188,156)": {
    color: "rgb(26, 188, 156)"
  },
  "color-rgb(40,50,78)": {
    color: "rgb(40, 50, 78)"
  },
  "color-rgb(41,105,176)": {
    color: "rgb(41, 105, 176)"
  },
  "color-rgb(44,130,201)": {
    color: "rgb(44, 130, 201)"
  },
  "color-rgb(61,142,185)": {
    color: "rgb(61, 142, 185)"
  },
  "color-rgb(65,168,95)": {
    color: "rgb(65, 168, 95)"
  },
  "color-rgb(71,85,119)": {
    color: "rgb(71, 85, 119)"
  },
  "color-rgb(84,172,210)": {
    color: "rgb(84, 172, 210)"
  },
  "color-rgb(85,57,130)": {
    color: "rgb(85, 57, 130)"
  },
  "color-rgb(97,189,109)": {
    color: "rgb(97, 189, 109)"
  },
  "color-rgb(124,112,107)": {
    color: "rgb(124, 112, 107)"
  },
  "color-rgb(147,101,184)": {
    color: "rgb(147, 101, 184)"
  },
  "color-rgb(163,143,132)": {
    color: "rgb(163, 143, 132)"
  },
  "color-rgb(184,49,47)": {
    color: "rgb(184, 49, 47)"
  },
  "color-rgb(204,204,204)": {
    color: "rgb(204, 204, 204)"
  },
  "color-rgb(209,72,65)": {
    color: "rgb(209, 72, 65)"
  },
  "color-rgb(209,213,216)": {
    color: "rgb(209, 213, 216)"
  },
  "color-rgb(226,80,65)": {
    color: "rgb(226, 80, 65)"
  },
  "color-rgb(235,107,86)": {
    color: "rgb(235, 107, 86)"
  },
  "color-rgb(239,239,239)": {
    color: "rgb(239, 239, 239)"
  },
  "color-rgb(243,121,52)": {
    color: "rgb(243, 121, 52)"
  },
  "color-rgb(247,218,100)": {
    color: "rgb(247, 218, 100)"
  },
  "color-rgb(250,197,28)": {
    color: "rgb(250, 197, 28)"
  },
  "color-rgb(251,160,38)": {
    color: "rgb(251, 160, 38)"
  },
  "color-rgb(255,255,255)": {
    color: "rgb(255, 255, 255)"
  }
}


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
    this.onChange = props.onChange;
    this.setStyle = (styleToSet) => this._setStyle(styleToSet);
  }

  _setStyle(styleToSet) {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(styleMap)
      .reduce((contentState, style) => {
        return Modifier.applyInlineStyle(contentState, selection, style)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, style) => {
        return RichUtils.toggleInlineStyle(state, style);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(styleToSet)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        styleToSet
      );
    }

    this.onChange(nextEditorState);
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
        customStyleMap={styleMap}
        ref={(ref) => this.editor = ref}
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