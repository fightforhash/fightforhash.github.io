import React from 'react';
import { PERSONAL_INFO } from '../../constants';

/** The inventory sticker on the rack door: who owns it and what build is running. */
export const AssetTag: React.FC = () => (
  <footer className="max-w-[1080px] mx-auto mt-5 flex justify-end">
    <div className="asset-tag px-4 py-3 w-full sm:w-[340px]">
      <div className="flex justify-between items-baseline">
        <span className="silk text-[15px]">Property of {PERSONAL_INFO.name}</span>
        <span className="silk text-[12px] opacity-70">asset TH-2026</span>
      </div>
      <div className="barcode mt-2" aria-hidden="true" />
      <p className="silk mt-2 text-[12px] opacity-80">
        build {__COMMIT_SHA__}, {__BUILD_TIME__}
      </p>
    </div>
  </footer>
);
