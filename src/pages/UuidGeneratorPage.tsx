import Header from "@/components/Header";
import UuidGenerator from "@/components/UuidGenerator";
import AdPlaceholder from "@/components/AdPlaceholder";
import SEOHead from "@/components/SEOHead";

const UuidGeneratorPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEOHead
      title="UUID Generator - Generate Random UUIDs Online"
      description="Free online UUID generator. Generate UUID v4 instantly. Bulk generate, copy and manage unique identifiers for your projects."
      canonical="https://devtools.stephen.io.vn/uuid-generator"
    />
    <Header />
    <main className="flex-1 flex justify-center gap-6 p-4 md:p-6">
      <div className="flex-1 max-w-4xl space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">UUID Generator</h1>
          <p className="text-sm text-muted-foreground">
            Generate random UUIDs (v4) instantly — bulk generate, copy & manage
          </p>
        </div>
        <UuidGenerator />
      </div>
      <aside className="hidden xl:flex flex-col items-center pt-10">
        <AdPlaceholder width={300} height={250} />
      </aside>
    </main>
  </div>
);

export default UuidGeneratorPage;
