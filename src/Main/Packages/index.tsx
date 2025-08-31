import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackageGroupRequest } from "./slice";
import type { RootState } from "../../redux/store";
import PackageGroupList from "./components/PackageGroupList";
export default function Packages() {
  const fetchData = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetchData.current) {
      fetchData.current = true;
      dispatch(fetchPackageGroupRequest());
    }
  }, [dispatch]);

    const { PackageGroupLoading, PackageGroupdata } = useSelector((state: RootState) => state.packageFront);
console.log(PackageGroupLoading, PackageGroupdata);

  return (
    <div>
      <PackageGroupList/>
    </div>
  )
}
