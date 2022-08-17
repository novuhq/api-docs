import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import cshtml from 'react-syntax-highlighter/dist/esm/languages/prism/cshtml';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('cshtml', cshtml);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('java', java);

const Code = ({ language, content, isActive }) => (
  <div className={clsx(`language-${language}`, !isActive && 'hidden')}>
    <SyntaxHighlighter
      className="scrollbar-hidden h-full overflow-auto rounded-b bg-white px-5 py-4 text-sm font-normal text-black dark:bg-gray-2 dark:text-white"
      language={language}
      useInlineStyles={false}
      showLineNumbers
    >
      {content}
    </SyntaxHighlighter>
  </div>
);

Code.propTypes = {
  language: PropTypes.oneOf([
    'javascript',
    'jsx',
    'ruby',
    'python',
    'go',
    'php',
    'bash',
    'cshtml',
    'json',
    'css',
    'java',
  ]).isRequired,
  content: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

Code.defaultProps = {
  isActive: false,
};

export default Code;
