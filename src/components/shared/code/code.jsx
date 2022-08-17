import clsx from 'clsx';
import copyToClipboard from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
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

import CopyIcon from 'icons/copy.inline.svg';

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

const ANIMATION_DURATION = 0.2;
const MOTION_EASY = [0.25, 0.1, 0.25, 1];

const variants = {
  hidden: {
    opacity: 0,

    transition: {
      duration: ANIMATION_DURATION,
      ease: MOTION_EASY,
    },
  },
  visible: {
    opacity: 1,

    transition: {
      duration: ANIMATION_DURATION,
      ease: MOTION_EASY,
    },
  },
};

const CodeSnippets = ({ className, language, title, content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!isCopied) {
      copyToClipboard(content, { onCopy: setIsCopied(true) });
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  return (
    <div className={clsx('rounded-md border border-gray-10 dark:border-none', className)}>
      <div className="flex h-10 items-center justify-between rounded-t border-b border-gray-10 bg-white px-5 dark:border-none dark:bg-[#141414]">
        <span className="text-xs font-bold uppercase text-gray-2 dark:text-gray-8">{title}</span>

        <div className="flex space-x-7">
          <button
            className="group relative flex items-center justify-center"
            type="button"
            onClick={handleCopy}
          >
            <AnimatePresence>
              {isCopied && (
                <motion.span
                  className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black py-1 px-1.5 text-xs font-normal capitalize text-white opacity-50 md:-ml-2"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>

            <CopyIcon className="h-5 transition-opacity duration-200 group-hover:opacity-80" />
          </button>
        </div>
      </div>

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
};

CodeSnippets.propTypes = {
  className: PropTypes.string,
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

CodeSnippets.defaultProps = {
  className: null,
};

export default CodeSnippets;
