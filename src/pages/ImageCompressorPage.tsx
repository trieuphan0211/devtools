import Header from "@/components/Header";
import ImageCompressor from "@/components/ImageCompressor";
import SEOHead from "@/components/SEOHead";

const ImageCompressorPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEOHead
      title="Image Compressor & Converter - Compress Images Online"
      description="Free online image compressor and converter. Compress and convert images to WebP, PNG or JPG with adjustable quality. No upload required."
      canonical="https://devtools.stephen.io.vn/image-compressor"
    />
    <Header />
    <main className="flex-1 p-4 md:p-6 space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          Image Compressor & Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Compress and convert images to WebP, PNG, or JPG
        </p>
      </div>
      <ImageCompressor />
    </main>
  </div>
);

export default ImageCompressorPage;
