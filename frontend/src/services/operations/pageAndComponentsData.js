

import { apiConnector } from "../apiconnectors";
import { catalogData } from "../api";
import { toast } from "react-hot-toast";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
   
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOG_PAGE_DATA_API,
      { categoryId }
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch catalog page data");
    }

    // console.log("Response :", response);
   const result = response?.data?.data
    return result
  } catch (err) {
    console.log("Catalog Page API Error:", err);

    toast.error(err.message);

    return null;
  } finally {
    toast.dismiss(toastId);
  }
};