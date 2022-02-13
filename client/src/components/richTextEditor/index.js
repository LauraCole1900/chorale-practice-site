import { Component } from "react";
import { convertFromRaw, EditorState, Modifier, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import ColorPicker from "./colorPicker";
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
  "color-#4d4d4d": {
    color: "#4d4d4d"
  },
  "color-#333333": {
    color: "#333333"
  },
  "color-#999999": {
    color: "#999999"
  },
  "color-#000000": {
    color: "#000000"
  },
  "color-#808080": {
    color: "#808080"
  },
  "color-#666666": {
    color: "#666666"
  },
  "color-#ffffff": {
    color: "#ffffff"
  },
  "color-#cccccc": {
    color: "#cccccc"
  },
  "color-#b3b3b3": {
    color: "#b3b3b3"
  },
  "color-#f44e3b": {
    color: "#f44e3b"
  },
  "color-#d33115": {
    color: "#d33115"
  },
  "color-#9f0500": {
    color: "#9f0500"
  },
  "color-#fe9200": {
    color: "#fe9200"
  },
  "color-#e27300": {
    color: "#e27300"
  },
  "color-#c45100": {
    color: "#c45100"
  },
  "color-#fcdc00": {
    color: "#fcdc00"
  },
  "color-#fcc400": {
    color: "#fcc400"
  },
  "color-#fb9e00": {
    color: "#fb9e00"
  },
  "color-#dbdf00": {
    color: "#dbdf00"
  },
  "color-#b0bc00": {
    color: "#b0bc00"
  },
  "color-#808900": {
    color: "#808900"
  },
  "color-#a4dd00": {
    color: "#a4dd00"
  },
  "color-#68bc00": {
    color: "#68bc00"
  },
  "color-#194d33": {
    color: "#194d33"
  },
  "color-#68ccca": {
    color: "#68ccca"
  },
  "color-#16a5a5": {
    color: "#16a5a5"
  },
  "color-#0c797d": {
    color: "#0c797d"
  },
  "color-#73d8ff": {
    color: "#73d8ff"
  },
  "color-#009ce0": {
    color: "#009ce0"
  },
  "color-#0062b1": {
    color: "#0062b1"
  },
  "color-#aea1ff": {
    color: "#aea1ff"
  },
  "color-#7b64ff": {
    color: "#7b64ff"
  },
  "color-#653294": {
    color: "#653294"
  },
  "color-#fda1ff": {
    color: "#fda1ff"
  },
  "color-#fa28ff": {
    color: "#fa28ff"
  },
  "color-#ab149e": {
    color: "#ab149e"
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
          history: { inDropdown: false },
          colorPicker: { component: ColorPicker }
        }}
      />
    </div>
  }
};

export default EditorContainer;