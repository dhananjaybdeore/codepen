import Editor from "./components/Editor";
import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
    <html>${html}</html>
    <style>${css}</style>
    <script>${js}</script>
  
    `);
    }, 1000);
    // return clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          height="100%"
          width="100%"
          border="0"
        />
      </div>
    </>
  );
}

export default App;
