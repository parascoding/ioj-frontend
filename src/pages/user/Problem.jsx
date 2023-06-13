import React from 'react'
import Markdown from 'markdown-to-jsx';
import { render } from 'react-dom';
var src = "# This is markdown document"
    
const Problem = () => {
    render(<Markdown># Hello world!</Markdown>, document.body);

}
export default Problem;