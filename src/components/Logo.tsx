import logoAsset from "@/assets/capaciti-logo.png.asset.json";

export function Logo({ size = 32, withText = false }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt="CAPACITI"
        width={size}
        height={size}
        className="rounded-lg object-contain"
        style={{ width: size, height: size }}
      />
      {withText && (
        <div className="leading-tight">
          <div className="font-display text-base font-bold tracking-tight">CAPACITI</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Workflow AI</div>
        </div>
      )}
    </div>
  );
}
