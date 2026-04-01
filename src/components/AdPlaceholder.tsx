interface AdPlaceholderProps {
  width: number;
  height: number;
  className?: string;
  label?: string;
}

const AdPlaceholder = ({ width, height, className = "", label }: AdPlaceholderProps) => (
  <div
    className={`flex items-center justify-center rounded-lg border border-ad-border bg-ad text-muted-foreground text-xs font-mono select-none ${className}`}
    style={{ width: "100%", maxWidth: width, height }}
  >
    {label || `Ad ${width}×${height}`}
  </div>
);

export default AdPlaceholder;
