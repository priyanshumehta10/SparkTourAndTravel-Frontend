import { useDispatch, useSelector } from "react-redux";
import { fetchHomeDataRequest } from "./slice";
import { useEffect } from "react";
import type { RootState } from "../../redux/store";

export default function Home() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(fetchHomeDataRequest());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Home Page</h1>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
