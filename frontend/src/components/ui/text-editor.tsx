import { useState, useCallback, memo, ReactNode } from 'react';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading1, Heading2, Italic, List, Strikethrough, LucideIcon } from "lucide-react";
import { cn } from '@utils/index';

const extensions = [StarterKit];

interface ToolbarButtonProps {
    isActive: boolean;
    onClick: () => void;
    children: ReactNode;
    className?: string;
}

const ToolbarButton = memo(({ isActive, onClick, children, className = "" }: ToolbarButtonProps) => (
    <button
        onClick={onClick}
        className={cn("p-1 hover:bg-gray-100 rounded [&>svg]:size-4", isActive ? 'bg-gray-200' : '', className)}
    >
        {children}
    </button>
));

interface ToolbarProps {
    editor: Editor | null;
}

interface ButtonConfig {
    icon: LucideIcon | ReactNode;
    onClick: () => void;
    isActive: boolean;
}

const Toolbar = memo(({ editor }: ToolbarProps) => {
    if (!editor) return null;

    const actions: ButtonConfig[] = [
        {
            icon: <Bold />,
            onClick: useCallback(() => editor.chain().focus().toggleBold().run(), [editor]),
            isActive: editor.isActive('bold')
        },
        {
            icon: <Italic />,
            onClick: useCallback(() => editor.chain().focus().toggleItalic().run(), [editor]),
            isActive: editor.isActive('italic')
        },
        {
            icon: <Strikethrough />,
            onClick: useCallback(() => editor.chain().focus().toggleStrike().run(), [editor]),
            isActive: editor.isActive('strike')
        },
        {
            icon: <List />,
            onClick: useCallback(() => editor.chain().focus().toggleBulletList().run(), [editor]),
            isActive: editor.isActive('bulletList')
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M13 6v15h-2V6H5V4h14v2z" fill="currentColor"></path>
                </svg>
            ),
            onClick: useCallback(() => editor.chain().focus().setParagraph().run(), [editor]),
            isActive: editor.isActive('paragraph')
        },
        {
            icon: <Heading1 />,
            onClick: useCallback(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), [editor]),
            isActive: editor.isActive('heading', { level: 1 })
        },
        {
            icon: <Heading2 />,
            onClick: useCallback(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), [editor]),
            isActive: editor.isActive('heading', { level: 2 })
        }
    ];

    return (
        <div className="py-1 flex flex-wrap gap-2 border-b">
            {actions.map((button, index) => (
                <ToolbarButton
                    key={index}
                    isActive={button.isActive}
                    onClick={button.onClick}
                >
                    {button?.icon}
                </ToolbarButton>
            ))}
        </div>
    );
});

Toolbar.displayName = 'Toolbar';
ToolbarButton.displayName = 'ToolbarButton';

interface TextEditorProps {
    initialContent?: string;

    placeholder?: string;
    onChange?: (html: string) => void;
}

export const TextEditor = ({
    initialContent,
    onChange
}: TextEditorProps) => {
    const [content, setContent] = useState(initialContent);

    const onUpdate = useCallback(({ editor }: { editor: Editor }) => {
        const html = editor.getHTML();
        setContent(html);
        onChange?.(html);
    }, [onChange]);

    const editor = useEditor({
        extensions,
        content,
        onUpdate
    });

    // const handleClearEditor = useCallback(() => {
    //     editor?.commands.clearContent();
    // }, [editor]);

    // const handleExportHTML = useCallback(() => {
    //     if (editor) {
    //         const html = editor.getHTML();
    //         navigator.clipboard.writeText(html)
    //             .then(() => alert('HTML copied to clipboard'))
    //             .catch(err => console.error('Failed to copy HTML:', err));
    //     }
    // }, [editor]);

    if (!editor) {
        return <div className="p-4">Loading editor...</div>;
    }

    function handleChange() {

    }
    return (
        <div>
            <div className="border p-1 px-2 rounded-md">
                <Toolbar editor={editor} />
                <div className="min-h-20">
                    <EditorContent
                        editor={editor}
                        onChange={handleChange}
                        className="block w-full h-full text-sm text-left py-1.5 px-2 [&>div[role='textbox']]:outline-none"
                        placeholder='Type here...'
                    />
                </div>
            </div>

        </div>
    );
};