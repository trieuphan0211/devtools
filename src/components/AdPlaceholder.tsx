interface AdPlaceholderProps {
  width: number;
  height: number;
  className?: string;
  label?: string;
}

const AdPlaceholder = ({
  width,
  height,
  className = "",
  label,
}: AdPlaceholderProps) => (
  <div
    className={`flex items-center justify-center rounded-lg border border-ad-border bg-ad text-muted-foreground text-xs font-mono select-none ${className}`}
    style={{ width: "100%", maxWidth: width, height }}
  >
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5486007501237656"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
);

export default AdPlaceholder;
