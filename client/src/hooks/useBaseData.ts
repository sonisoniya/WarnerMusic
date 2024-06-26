import { useState, useEffect } from 'react';
import { fetchBaseData } from '../Api';

export interface BaseData {
  CC_CALL_CENTER_ID: string;
  CC_NAME: string;
}

const useBaseData = (trigger: number, columns?:string[]) => {
  const [data, setData] = useState<BaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(trigger > 0){
          
        setLoading(true);
        const allColumns = columns ? ['ALBUM', ...new Set(columns)] : ['ALBUM'];
      
        const responseData = await fetchBaseData(allColumns || []);
        setData(responseData);
        setLoading(false);

      }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [trigger,columns]); // Run effect when trigger changes

  return { data, loading, error };
};

export default useBaseData;
