import { useState, useRef, useCallback } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Download, Upload, Link, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const QrCodeGenerator = () => {
  const [text, setText] = useState("https://example.com");
  const [fgColor, setFgColor] = useState("#1d4ed8");
  const [logo, setLogo] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogo(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const downloadPNG = useCallback(() => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "qrcode.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }, []);

  const downloadSVG = useCallback(() => {
    const svg = document.getElementById("qr-svg");
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.download = "qrcode.svg";
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const imageSettings = logo
    ? { src: logo, height: 40, width: 40, excavate: true }
    : undefined;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl mx-auto">
      {/* Left: Controls */}
      <Card className="flex-1 min-w-0">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Link className="h-4 w-4 text-primary" /> URL or Text
            </Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text…"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Palette className="h-4 w-4 text-primary" /> QR Color
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-input cursor-pointer"
              />
              <Input
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="font-mono text-sm max-w-[120px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold">
              <Upload className="h-4 w-4 text-primary" /> Center Logo
            </Label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            {logo ? (
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-12 h-12 rounded-md border border-input object-contain bg-muted" />
                <Button variant="ghost" size="sm" onClick={() => { setLogo(null); if (fileRef.current) fileRef.current.value = ""; }}>
                  <X className="h-4 w-4 mr-1" /> Remove
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                Upload Image
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Right: Preview */}
      <Card className="flex-1 min-w-0">
        <CardContent className="p-6 flex flex-col items-center gap-6">
          <div className="p-6 bg-background rounded-xl border border-border">
            {/* Hidden canvas for PNG download */}
            <div ref={canvasRef} className="hidden">
              <QRCodeCanvas
                value={text || " "}
                size={512}
                fgColor={fgColor}
                bgColor="#ffffff"
                level="H"
                imageSettings={imageSettings}
              />
            </div>
            {/* Visible SVG preview */}
            <QRCodeSVG
              id="qr-svg"
              value={text || " "}
              size={220}
              fgColor={fgColor}
              bgColor="#ffffff"
              level="H"
              imageSettings={imageSettings}
            />
          </div>

          <div className="flex gap-3 w-full">
            <Button onClick={downloadPNG} className="flex-1 gap-2">
              <Download className="h-4 w-4" /> Download PNG
            </Button>
            <Button onClick={downloadSVG} variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" /> Download SVG
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QrCodeGenerator;
