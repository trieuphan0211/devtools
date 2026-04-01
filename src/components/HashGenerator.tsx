import { useState, useEffect } from "react";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function digestHex(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setHashes({});
      return;
    }
    let cancelled = false;
    (async () => {
      const results: Record<string, string> = {};
      for (const algo of ALGORITHMS) {
        results[algo] = await digestHex(algo, input);
      }
      if (!cancelled) setHashes(results);
    })();
    return () => { cancelled = true; };
  }, [input]);

  const copy = (algo: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(algo);
    toast({ title: `${algo} hash copied` });
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to generate hashes…"
        className="w-full min-h-[140px] p-5 text-sm font-mono bg-editor text-editor-foreground border border-border rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
      />

      <div className="space-y-3">
        {ALGORITHMS.map((algo) => (
          <Card key={algo}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex items-center gap-2 w-20 shrink-0">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-foreground">{algo}</span>
              </div>
              <input
                readOnly
                value={hashes[algo] || "—"}
                className="flex-1 text-xs font-mono bg-muted/50 text-muted-foreground rounded-md px-3 py-2 border border-border truncate"
              />
              <Button
                size="icon"
                variant="ghost"
                disabled={!hashes[algo]}
                onClick={() => copy(algo, hashes[algo])}
              >
                {copied === algo ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HashGenerator;
