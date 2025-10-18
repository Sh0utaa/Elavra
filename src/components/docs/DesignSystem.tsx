import { PHeading, PWordmark } from "@porsche-design-system/components-react";

export function DesignSystem() {
  return (
    <>
      <div className="grid justify-items-center gap-fluid-md m-static-lg p-fluid-lg bg-surface rounded-lg">
        <PWordmark />
        <PHeading>Hello</PHeading>
        <h1 className="prose-display-md">Porsche Design System</h1>
      </div>
      <div className="…">…</div>
    </>
  );
}
