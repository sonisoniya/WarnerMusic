// useLanguageData.ts
import { useState, useEffect } from 'react';
import { fetchLanguageData, fetchLanguageBaseData } from '../Api';

export interface LanguageData {
  CC_CALL_CENTER_ID: string;
  CC_NAME: string;
}
const useLanguageData = (trigger: boolean, viewType:string) => {
  const [data, setData] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!trigger) return; // Exit if trigger is false
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseData = (viewType =='validate')? await fetchLanguageData():await fetchLanguageBaseData();
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

export default useLanguageData;
