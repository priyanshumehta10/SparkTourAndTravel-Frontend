import { useDispatch, useSelector } from "react-redux";
import { fetchHomeDataRequest } from "./slice";
import { useEffect, useRef } from "react";
import type { RootState } from "../../redux/store";

export default function Home() {
  const dispatch = useDispatch();
  const fetchData = useRef(false);
  const { data } = useSelector((state: RootState) => state.home);
console.log(data);
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  console.log("data in admin", user, isAuthenticated, loading);
  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
          dispatch(fetchHomeDataRequest());
    }
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Home Page</h1>
      {loading ?  <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      
    </div>
  );
}
