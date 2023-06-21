import MarkdownPreview from "@uiw/react-markdown-preview";
import { Container } from "reactstrap";
import faq from "../../data/faq.txt";
import { useEffect, useState } from "react";
const Faq = () => {
  const [markDown, setMarkdown] = useState("");
  useEffect(() => {
    const reader  = new FileReader();
    fetch(faq)
    .then(r => r.text())
    .then(text => {
      setMarkdown(text);
    })
  }, [])
  return (
    <>
      <Container>
        {/* <div className="Container" dangerouslySetInnerHTML={{__html: problemStatement
        }}></div> */}
        <MarkdownPreview
          source={markDown}
          rehypeRewrite={(node, index, parent) => {
            if (
              node.tagName === "a" &&
              parent &&
              /^h(1|2|3|4|5|6)/.test(parent.tagName)
            ) {
              parent.children = parent.children.slice(1);
            }
          }}
          wrapperElement={{
            "data-color-mode": "light",
          }}
        />
      </Container>
    </>
  );
};
export default Faq;
