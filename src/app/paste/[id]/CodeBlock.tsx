"use client";

import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
    code: string;
    language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    return (
        <Highlight theme={themes.nightOwl} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={`overflow-x-auto p-6 font-mono text-sm leading-relaxed ${className}`}
                    style={{ ...style, background: "transparent" }}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};

export default CodeBlock;
