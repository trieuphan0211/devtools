import { useState } from "react";
import { Copy, Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

function generateUUID(): string {
  return crypto.randomUUID();
}

const UuidGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [copied, setCopied] = useState<number | null>(null);
  const [version, setVersion] = useState<"v4" | "nil">("v4");

  const addUuid = () => {
    const val = version === "nil" ? "00000000-0000-0000-0000-000000000000" : generateUUID();
    setUuids((prev) => [val, ...prev]);
  };

  const regenerateAll = () => {
    setUuids((prev) =>
      prev.map(() => (version === "nil" ? "00000000-0000-0000-0000-000000000000" : generateUUID()))
    );
  };

  const removeUuid = (index: number) => {
    setUuids((prev) => prev.filter((_, i) => i !== index));
  };

  const copyOne = (index: number, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(index);
    toast({ title: "UUID copied" });
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    toast({ title: `${uuids.length} UUIDs copied` });
  };

  const bulkGenerate = (count: number) => {
    const newUuids = Array.from({ length: count }, () =>
      version === "nil" ? "00000000-0000-0000-0000-000000000000" : generateUUID()
    );
    setUuids(newUuids);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
          {(["v4", "nil"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVersion(v)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                version === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "v4" ? "UUID v4" : "Nil UUID"}
            </button>
          ))}
        </div>

        <Button onClick={addUuid} size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Generate
        </Button>
        <Button onClick={regenerateAll} size="sm" variant="secondary" className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" /> Regenerate All
        </Button>
        <Button onClick={copyAll} size="sm" variant="outline" className="gap-1.5" disabled={uuids.length === 0}>
          <Copy className="h-3.5 w-3.5" /> Copy All
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[5, 10, 25, 50].map((n) => (
          <Button key={n} size="sm" variant="ghost" onClick={() => bulkGenerate(n)} className="text-xs">
            Bulk {n}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <Card key={`${uuid}-${i}`}>
            <CardContent className="p-3 flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-6 text-right shrink-0">
                {i + 1}
              </span>
              <code className="flex-1 text-sm font-mono text-foreground select-all break-all">
                {uuid}
              </code>
              <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8" onClick={() => copyOne(i, uuid)}>
                {copied === i ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeUuid(i)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {uuids.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Click "Generate" to create a new UUID
        </div>
      )}
    </div>
  );
};

export default UuidGenerator;
