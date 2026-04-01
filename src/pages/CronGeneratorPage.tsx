import Header from "@/components/Header";
import CronGenerator from "@/components/CronGenerator";
import SEOHead from "@/components/SEOHead";

const CronGeneratorPage = () => (
  <div className="flex flex-col h-screen overflow-hidden">
    <SEOHead
      title="Cron Job Generator - Build Cron Expressions Easily"
      description="Free cron expression generator with human-readable translations and next scheduled run previews. Build crontab expressions visually."
      canonical="https://devtools.stephen.io.vn/cron-generator"
    />
    <Header />
    <CronGenerator />
  </div>
);

export default CronGeneratorPage;
