"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export interface UtmData {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
}

export function useUtmTracker() {
  const searchParams = useSearchParams();
  const [utmData, setUtmData] = useState<UtmData>({
    source: null,
    medium: null,
    campaign: null,
    term: null,
  });

  useEffect(() => {
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');
    const campaign = searchParams.get('utm_campaign');
    const term = searchParams.get('utm_term');

    const currentUtm = { source, medium, campaign, term };

    if (source || medium || campaign || term) {
      sessionStorage.setItem('utm_data', JSON.stringify(currentUtm));
      setUtmData(currentUtm);
    } else {
      const stored = sessionStorage.getItem('utm_data');
      if (stored) {
        try {
          setUtmData(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse UTM data", e);
        }
      }
    }
  }, [searchParams]);

  return utmData;
}
