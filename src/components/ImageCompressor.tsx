import { useState, useRef, useCallback } from "react";
import { CloudUpload, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import AdPlaceholder from "@/components/AdPlaceholder";

const FORMATS = ["image/webp", "image/png", "image/jpeg"] as const;
const FORMAT_LABELS: Record<string, string> = { "image/webp": "WebP", "image/png": "PNG", "image/jpeg": "JPG" };

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<string>("image/webp");
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const loadFile = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) loadFile(f);
  }, [loadFile]);

  const compress = useCallback(async () => {
    if (!preview) return;
    setProcessing(true);
    const img = new window.Image();
    img.src = preview;
    await new Promise((r) => (img.onload = r));
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          setResult({ url: URL.createObjectURL(blob), size: blob.size });
        }
        setProcessing(false);
      },
      format,
      quality / 100,
    );
  }, [preview, format, quality]);

  const formatSize = (b: number) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Drop zone */}
      {!file ? (
        <div
          ref={dropRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-4 p-16 border-2 border-dashed border-primary/30 rounded-2xl bg-muted/30 cursor-pointer hover:border-primary/60 transition-colors"
        >
          <CloudUpload className="h-14 w-14 text-primary/50" />
          <p className="text-muted-foreground font-medium">Drag & drop an image here, or click to browse</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
        </div>
      ) : (
        <>
          {/* Preview */}
          <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
              <img src={preview!} alt="Preview" className="w-32 h-32 object-contain rounded-lg border border-border bg-muted" />
              <div className="flex-1 space-y-1 text-sm">
                <p className="font-semibold text-foreground">{file.name}</p>
                <p className="text-muted-foreground">Original: {formatSize(file.size)}</p>
                {result && (
                  <p className="text-success font-semibold">
                    Compressed: {formatSize(result.size)} ({Math.round((1 - result.size / file.size) * 100)}% smaller)
                  </p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPreview(null); setResult(null); }}>
                Change
              </Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Compression Quality: {quality}%</Label>
                <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-primary" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Output Format</Label>
                <div className="flex gap-2">
                  {FORMATS.map((f) => (
                    <Button key={f} size="sm" variant={format === f ? "default" : "outline"} onClick={() => setFormat(f)}>
                      {FORMAT_LABELS[f]}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={compress} disabled={processing} className="w-full gap-2">
                <ImageIcon className="h-4 w-4" /> {processing ? "Compressing…" : "Compress Image"}
              </Button>
            </CardContent>
          </Card>

          {/* Download */}
          {result && (
            <div className="flex justify-center">
              <Button asChild size="lg" className="gap-2">
                <a href={result.url} download={`compressed.${FORMAT_LABELS[format].toLowerCase()}`}>
                  <Download className="h-4 w-4" /> Download {FORMAT_LABELS[format]}
                </a>
              </Button>
            </div>
          )}
        </>
      )}

      <div className="flex justify-center">
        <AdPlaceholder width={728} height={90} />
      </div>
    </div>
  );
};

export default ImageCompressor;
