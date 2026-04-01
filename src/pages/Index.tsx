import Header from "@/components/Header";
import JsonEditor from "@/components/JsonEditor";
import SEOHead from "@/components/SEOHead";

const Index = () => (
  <div className="flex flex-col h-screen overflow-hidden">
    <SEOHead
      title="JSON Formatter & Validator - DevTools"
      description="Free online JSON formatter, validator and beautifier. Paste your JSON to format, validate and minify instantly."
      canonical="https://devtools.stephen.io.vn/"
    />
    <Header />
    <JsonEditor />
  </div>
);

export default Index;
