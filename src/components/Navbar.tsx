import {
  PorscheDesignSystemProvider,
  PButtonPure,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
  PCrest,
  PWordmark,
} from "@porsche-design-system/components-react";
import { useState, useRef } from "react";

function Navbar() {
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeDrilldownId, setActiveDrilldownId] = useState<string>("");

  const handleDrilldownUpdate = (e: any) => {
    setActiveDrilldownId(e.detail.activeIdentifier);
  };

  const handleDrilldownDismiss = (e: any) => {
    setIsDrilldownOpen(false);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      const isPaused = videoRef.current.paused;
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsVideoPaused(!isPaused);
    }
  };
  return (
    <PorscheDesignSystemProvider>
      <div className="bg-base">
        {/* Header */}
        <header className="z-1 grid-template absolute inset-x-0 before:absolute before:inset-[0_0_-60px_0] before:-z-1 before:pointer-events-none before:bg-fade-to-b">
          <div className="col-wide grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-fluid-md items-center min-h-[80px]">
            {/* Left Section - Navigation */}
            <div className="flex flex-wrap gap-static-md items-center justify-start">
              <nav aria-label="Main">
                <PButtonPure
                  className="p-static-xs -m-static-xs"
                  theme="dark"
                  icon="menu-lines"
                  hideLabel={{ base: true, s: false }}
                  onClick={() => setIsDrilldownOpen(true)}
                  aria={{ "aria-haspopup": "dialog" }}
                >
                  Menu
                </PButtonPure>

                <PDrilldown
                  open={isDrilldownOpen}
                  activeIdentifier={activeDrilldownId}
                  onDismiss={handleDrilldownDismiss}
                  onUpdate={handleDrilldownUpdate}
                >
                  <PDrilldownItem identifier="id-1" label="Some Label (1)">
                    <PDrilldownItem
                      identifier="id-1-1"
                      label="Some Label (1-1)"
                    >
                      <PDrilldownLink href="#">
                        Some anchor (1-1)
                      </PDrilldownLink>
                      <PDrilldownLink href="#">
                        Some anchor (1-1)
                      </PDrilldownLink>
                    </PDrilldownItem>
                    <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
                    <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
                    <PDrilldownLink href="#">Some anchor (1)</PDrilldownLink>
                  </PDrilldownItem>

                  <PDrilldownItem identifier="id-2" label="Some Label (2)">
                    <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
                    <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
                    <PDrilldownLink href="#">Some anchor (2)</PDrilldownLink>
                  </PDrilldownItem>

                  <PDrilldownItem identifier="id-3" label="Some Label (3)">
                    <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
                    <PDrilldownLink href="#">Some anchor (3)</PDrilldownLink>
                  </PDrilldownItem>
                </PDrilldown>
              </nav>
            </div>
            {/* Center - Logo */}
            <PCrest className="sm:hidden" href="/" />
            <PWordmark className="max-sm:hidden" theme="dark" href="#" />
            {/* Right Section - Actions */}
            <div className="flex flex-wrap gap-static-md items-center justify-end">
              <PButtonPure
                onClick={() => (window.location.href = "/auth/login")}
                className="p-static-xs -m-static-xs"
                theme="dark"
                icon="user"
                hideLabel={true}
                title="User"
              >
                User
              </PButtonPure>
            </div>
          </div>
        </header>
      </div>
    </PorscheDesignSystemProvider>
  );
}

export default Navbar;
