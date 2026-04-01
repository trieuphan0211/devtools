import Header from "@/components/Header";
import HashGenerator from "@/components/HashGenerator";
import AdPlaceholder from "@/components/AdPlaceholder";
import SEOHead from "@/components/SEOHead";

const HashGeneratorPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEOHead
      title="Hash Generator - Generate SHA & MD5 Hashes Online"
      description="Free online hash generator. Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes instantly. Copy results with one click."
      canonical="https://devtools.stephen.io.vn/hash-generator"
    />
    <Header />
    <main className="flex-1 flex justify-center gap-6 p-4 md:p-6">
      <div className="flex-1 max-w-4xl space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Hash Generator</h1>
          <p className="text-sm text-muted-foreground">
            Generate SHA-1, SHA-256, SHA-384 & SHA-512 hashes instantly
          </p>
        </div>
        <HashGenerator />
      </div>
      <aside className="hidden xl:flex flex-col items-center pt-10">
        <AdPlaceholder width={300} height={250} />
      </aside>
    </main>
  </div>
);

export default HashGeneratorPage;
