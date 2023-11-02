import {OutputData} from "@editorjs/editorjs";

interface EditorCore {
    destroy(): Promise<void>;
    clear(): Promise<void>;
    save(): Promise<OutputData>;
    render(data: OutputData): Promise<void>;
}
export default EditorCore;