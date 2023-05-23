import { useState, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import collapseIcon from "../assets/collapseIcon.svg";
import compressIcon from "../assets/compressIcon.svg";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompressAlt,
  faExpandAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const Editor = (props) => {
  const Ref = useRef(null);
  const copyMessageRef = useRef(null);
  const { language, displayName, value, onChange } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  const copyContent = () => {
    console.log(Ref.current.props.value);
    if (Ref.current) {
      navigator.clipboard.writeText(Ref.current.props.value);
      copyMessageRef.current.classList.toggle("show");

      setTimeout(() => {
        copyMessageRef.current.classList.toggle("show");
      }, 3000);
    }
  };
  const [open, setOpen] = useState(true);
  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <div>
          <button
            type="button"
            className="expand-collapse-btn"
            onClick={() => {
              setOpen((prevOpen) => !prevOpen);
            }}
          >
            <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
            <br></br>
          </button>
          <FontAwesomeIcon
            icon={faCopy}
            onClick={copyContent}
            style={{ cursor: "pointer" }}
          />
          <div className="copied-message" ref={copyMessageRef}>
            Copied!
          </div>
        </div>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        ref={Ref}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: "material",
        }}
      />
    </div>
  );
};

export default Editor;
