import { useState, useCallback } from "react";
import { Copy, Check, KeyRound, FileCode, ShieldCheck } from "lucide-react";
import AdPlaceholder from "./AdPlaceholder";

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
  } catch {
    return atob(padded);
  }
}

function formatJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

interface DecodedParts {
  header: string;
  payload: string;
  signature: string;
}

function decodeJwt(token: string): DecodedParts | null {
  const parts = token.trim().split(".");
  if (parts.length !== 3) return null;
  try {
    return {
      header: formatJson(decodeBase64Url(parts[0])),
      payload: formatJson(decodeBase64Url(parts[1])),
      signature: parts[2],
    };
  } catch {
    return null;
  }
}

const sectionConfig = [
  {
    key: "header" as const,
    label: "Header",
    icon: FileCode,
    accent: "primary",
  },
  {
    key: "payload" as const,
    label: "Payload",
    icon: KeyRound,
    accent: "accent",
  },
  {
    key: "signature" as const,
    label: "Signature",
    icon: ShieldCheck,
    accent: "success",
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
      aria-label="Copy"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
};

const JwtDecoder = () => {
  const [token, setToken] = useState("");
  const decoded = token.trim() ? decodeJwt(token) : null;
  const hasError = token.trim().length > 0 && !decoded;

  const handleLoadSample = useCallback(() => setToken(SAMPLE_JWT), []);

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-auto">
      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-5 min-h-[420px]">
          {/* Left: Input */}
          <div className="flex-1 flex flex-col rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b bg-toolbar/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Encoded Token
              </span>
              <button
                onClick={handleLoadSample}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-2 hover:underline"
              >
                Load sample
              </button>
            </div>
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your JWT token here..."
              spellCheck={false}
              className="flex-1 w-full resize-none bg-editor text-editor-foreground font-mono text-sm p-4 focus:outline-none placeholder:text-muted-foreground/40 min-h-[200px]"
            />
            {hasError && (
              <div className="px-4 py-2 text-xs text-destructive bg-destructive/5 border-t font-medium">
                Invalid JWT format — expected 3 dot-separated parts.
              </div>
            )}
          </div>

          {/* Right: Decoded sections */}
          <div className="flex-1 flex flex-col gap-4">
            {sectionConfig.map(({ key, label, icon: Icon, accent }) => {
              const content = decoded?.[key] ?? "";
              const accentClasses: Record<string, string> = {
                primary: "border-primary/30 bg-primary/5",
                accent: "border-accent/30 bg-accent/5",
                success: "border-success/30 bg-success/5",
              };
              const badgeClasses: Record<string, string> = {
                primary: "bg-primary/10 text-primary",
                accent: "bg-accent/10 text-accent",
                success: "bg-success/10 text-success",
              };
              return (
                <div
                  key={key}
                  className={`flex-1 flex flex-col rounded-xl border shadow-sm overflow-hidden ${accentClasses[accent]}`}
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-inherit">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${badgeClasses[accent]}`}
                      >
                        <Icon className="h-3 w-3" /> {label}
                      </span>
                    </div>
                    {content && <CopyButton text={content} />}
                  </div>
                  <pre className="flex-1 p-3 text-xs font-mono text-card-foreground overflow-auto whitespace-pre-wrap min-h-[60px] break-all">
                    {content || (
                      <span className="text-muted-foreground/40 italic">
                        Decoded {label.toLowerCase()} will appear here...
                      </span>
                    )}
                  </pre>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="flex justify-center py-4 px-4 border-t bg-toolbar/30">
        <AdPlaceholder width={728} height={90} />
      </div>
    </div>
  );
};

export default JwtDecoder;
