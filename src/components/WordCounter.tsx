import { useState, useMemo } from "react";
import { Type, AlignLeft, Hash, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, characters, sentences, readingTime };
  }, [text]);

  const transform = (mode: "upper" | "lower" | "capitalize") => {
    if (mode === "upper") setText(text.toUpperCase());
    else if (mode === "lower") setText(text.toLowerCase());
    else setText(text.replace(/\b\w/g, (c) => c.toUpperCase()));
  };

  const statItems = [
    { icon: AlignLeft, label: "Words", value: stats.words },
    { icon: Hash, label: "Characters", value: stats.characters },
    { icon: Type, label: "Sentences", value: stats.sentences },
    { icon: Clock, label: "Reading Time", value: `${stats.readingTime} min` },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-0">
      {/* Stats Bar */}
      <div className="sticky top-0 z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-card border border-border rounded-t-xl">
        {statItems.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <s.icon className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here…"
        className="w-full min-h-[350px] p-6 text-base leading-relaxed bg-editor text-editor-foreground border-x border-border resize-y focus:outline-none font-sans placeholder:text-muted-foreground"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-4 bg-card border border-border rounded-b-xl">
        <Button size="sm" variant="secondary" onClick={() => transform("upper")}>
          UPPERCASE
        </Button>
        <Button size="sm" variant="secondary" onClick={() => transform("lower")}>
          lowercase
        </Button>
        <Button size="sm" variant="secondary" onClick={() => transform("capitalize")}>
          Capitalize
        </Button>
        <Button size="sm" variant="destructive" onClick={() => setText("")} className="ml-auto gap-1.5">
          <Trash2 className="h-3.5 w-3.5" /> Clear
        </Button>
      </div>
    </div>
  );
};

export default WordCounter;
