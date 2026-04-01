import Header from "@/components/Header";
import WordCounter from "@/components/WordCounter";
import AdPlaceholder from "@/components/AdPlaceholder";
import SEOHead from "@/components/SEOHead";

const WordCounterPage = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <SEOHead
      title="Word Counter & Text Formatter - Count Words Online"
      description="Free online word counter and text formatter. Count words, characters, sentences and reading time. Transform text to uppercase, lowercase or title case."
      canonical="https://devtools.stephen.io.vn/word-counter"
    />
    <Header />
    <main className="flex-1 p-4 md:p-6 space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          Word Counter & Text Formatter
        </h1>
        <p className="text-sm text-muted-foreground">
          Count words, characters, sentences and transform text instantly
        </p>
      </div>
      <div className="flex justify-center">
        <AdPlaceholder width={728} height={90} />
      </div>
      <WordCounter />
    </main>
  </div>
);

export default WordCounterPage;
