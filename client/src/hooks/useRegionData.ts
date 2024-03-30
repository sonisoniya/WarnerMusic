// useRegionData.ts
import { useState, useEffect } from 'react';
import { fetchRegionData, fetchRegionBaseData } from '../Api';

export interface RegionData {
  CC_CALL_CENTER_ID: string;
  CC_NAME: string;
}

const useRegionData = (trigger: boolean, viewType:string) => {

  const [data, setData] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!trigger) return; // Exit if trigger is false
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseData = (viewType =='validate')? await fetchRegionData():await fetchRegionBaseData();
        setData(responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [trigger]); // Run effect when trigger changes

  return { data, loading, error };
};

export default useRegionData;