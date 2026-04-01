import Header from "@/components/Header";
import JwtDecoder from "@/components/JwtDecoder";
import SEOHead from "@/components/SEOHead";

const JwtDecoderPage = () => (
  <div className="flex flex-col h-screen overflow-hidden">
    <SEOHead
      title="JWT Decoder - Decode JSON Web Tokens Online"
      description="Free online JWT decoder. Paste your JSON Web Token to instantly decode and inspect the header, payload and signature."
      canonical="https://devtools.stephen.io.vn/jwt-decoder"
    />
    <Header />
    <JwtDecoder />
  </div>
);

export default JwtDecoderPage;
