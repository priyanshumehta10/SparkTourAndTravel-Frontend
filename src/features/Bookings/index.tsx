import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "./slice";
import type { RootState } from "../../redux/store";

const index = () => {
  const dispatch = useDispatch();
  const fetchData = useRef(false);
  const { OrdersData, loading, error } = useSelector((state: RootState) => state.ordersAdmin);
  console.log(OrdersData, loading, error);

  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchOrdersRequest());
    }
  }, []);
  return (
    <div>
    </div>
  )
}

export default index
