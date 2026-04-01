import { useState, useCallback } from "react";
import { Copy, Trash2, Minimize2, WrapText, Check, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdPlaceholder from "./AdPlaceholder";

const SAMPLE = `{"name":"John Doe","age":30,"isActive":true,"address":{"street":"123 Main St","city":"Springfield"},"tags":["developer","designer"]}`;

const JsonEditor = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [valid, setValid] = useState<boolean | null>(null);

  const validate = useCallback((text: string) => {
    if (!text.trim()) { setValid(null); setError(null); return null; }
    try { const parsed = JSON.parse(text); setValid(true); setError(null); return parsed; }
    catch (e: any) { setValid(false); setError(e.message); return null; }
  }, []);

  const handleFormat = () => {
    const parsed = validate(input);
    if (parsed) setOutput(JSON.stringify(parsed, null, 2));
  };

  const handleMinify = () => {
    const parsed = validate(input);
    if (parsed) setOutput(JSON.stringify(parsed));
  };

  const handleClear = () => { setInput(""); setOutput(""); setError(null); setValid(null); };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadSample = () => { setInput(SAMPLE); setOutput(""); setError(null); setValid(null); };

  const handleInputChange = (val: string) => { setInput(val); validate(val); };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Top Ad Banner */}
      <div className="flex justify-center py-3 px-4">
        <AdPlaceholder width={728} height={90} />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-toolbar border-b flex-wrap">
        <Button size="sm" onClick={handleFormat} className="gap-1.5">
          <WrapText className="h-3.5 w-3.5" /> Format
        </Button>
        <Button size="sm" variant="secondary" onClick={handleMinify} className="gap-1.5">
          <Minimize2 className="h-3.5 w-3.5" /> Minify
        </Button>
        <Button size="sm" variant="secondary" onClick={handleClear} className="gap-1.5">
          <Trash2 className="h-3.5 w-3.5" /> Clear
        </Button>
        <Button size="sm" variant="secondary" onClick={handleCopy} className="gap-1.5" disabled={!output}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <div className="flex-1" />
        <button onClick={handleLoadSample} className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline">
          Load sample
        </button>
        {valid !== null && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${valid ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
            {valid ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
            {valid ? "Valid JSON" : "Invalid JSON"}
          </div>
        )}
      </div>

      {/* Editor Area */}
      <div className="flex flex-1 min-h-0">
        <div className="flex flex-1 min-h-0 flex-col md:flex-row">
          {/* Input */}
          <div className="flex-1 flex flex-col min-h-0 border-r">
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground bg-toolbar/50 border-b uppercase tracking-wider">
              Input
            </div>
            <textarea
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Paste your JSON here..."
              spellCheck={false}
              className="flex-1 w-full resize-none bg-editor text-editor-foreground font-mono text-sm p-4 focus:outline-none placeholder:text-muted-foreground/40 min-h-[200px]"
            />
          </div>
          {/* Output */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground bg-toolbar/50 border-b uppercase tracking-wider">
              Output
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted output will appear here..."
              spellCheck={false}
              className="flex-1 w-full resize-none bg-editor text-editor-foreground font-mono text-sm p-4 focus:outline-none placeholder:text-muted-foreground/40 min-h-[200px]"
            />
          </div>
        </div>

        {/* Sidebar Ad (desktop) */}
        <div className="hidden lg:flex flex-col items-center p-3 border-l bg-toolbar/30">
          <AdPlaceholder width={300} height={250} />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="px-4 py-2 text-xs font-mono text-destructive bg-destructive/5 border-t">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
