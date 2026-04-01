import Header from "@/components/Header";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import AdPlaceholder from "@/components/AdPlaceholder";
import SEOHead from "@/components/SEOHead";

const QrCodePage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEOHead
      title="QR Code Generator - Create Custom QR Codes Free"
      description="Free online QR code generator with custom colors and logo support. Download QR codes as PNG or SVG instantly."
      canonical="https://devtools.stephen.io.vn/qr-code"
    />
    <Header />
    <main className="flex-1 flex justify-center gap-6 p-4 md:p-6">
      <div className="flex-1 max-w-5xl flex flex-col gap-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">
            QR Code Generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Generate customizable QR codes with colors and logos
          </p>
        </div>
        <QrCodeGenerator />
      </div>
      <aside className="hidden xl:flex flex-col items-center pt-10">
        <AdPlaceholder width={300} height={600} />
      </aside>
    </main>
  </div>
);

export default QrCodePage;
