import { useDispatch, useSelector } from "react-redux";
import { fetchHomeDataRequest, fetchReviewsRequest } from "./slice";
import { useEffect, useRef } from "react";
import type { RootState } from "../../redux/store";
import MainHome from "./components/MainHome";
import HomeStatic from "./components/HomeStatic";
import HomeReviews from "./components/HomeReviews";

export default function Home() {
  const dispatch = useDispatch();
  const fetchData = useRef(false);
  const { loadingPck, ReviewsLoading } = useSelector((state: RootState) => state.home);

  const { loading } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchHomeDataRequest());
      dispatch(fetchReviewsRequest())
    }
  }, [dispatch]);


  return (
    <div >
      {(loading || loadingPck) ? <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div> :
        <>
          <MainHome />
          <HomeStatic />
          {
            !ReviewsLoading &&
            <HomeReviews />

          }
        </>
      }

    </div>
  );
}
