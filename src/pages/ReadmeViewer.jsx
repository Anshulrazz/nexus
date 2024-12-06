import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const ReadmeViewer = ({ filePath }) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(filePath);
                const text = await response.text();
                setContent(text);
            } catch (error) {
                console.error("Error fetching README.md:", error);
            }
        };

        fetchMarkdown();
    }, [filePath]);

    return (
        <div className="prose mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]} // Enables raw HTML rendering
            />
        </div>
    );
};

export default ReadmeViewer;
