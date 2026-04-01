import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import JwtDecoderPage from "./pages/JwtDecoderPage.tsx";
import CronGeneratorPage from "./pages/CronGeneratorPage.tsx";
import QrCodePage from "./pages/QrCodePage.tsx";
import WordCounterPage from "./pages/WordCounterPage.tsx";
import ImageCompressorPage from "./pages/ImageCompressorPage.tsx";
import HashGeneratorPage from "./pages/HashGeneratorPage.tsx";
import UuidGeneratorPage from "./pages/UuidGeneratorPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jwt-decoder" element={<JwtDecoderPage />} />
          <Route path="/cron-generator" element={<CronGeneratorPage />} />
          <Route path="/qr-code" element={<QrCodePage />} />
          <Route path="/word-counter" element={<WordCounterPage />} />
          <Route path="/image-compressor" element={<ImageCompressorPage />} />
          <Route path="/hash-generator" element={<HashGeneratorPage />} />
          <Route path="/uuid-generator" element={<UuidGeneratorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
