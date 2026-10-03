// import { apiConnector } from "../apiconnectors";
// import { catalogData } from "../api";
// import {toast} from "react-hot-toast"

// export const getCatalogPageData = async(categoryId)=>{
//       const toastId = toast.loading("Loading...");
//   let result = [];
//   try{
//     console.log("catalog page data api:", catalogData.CATALOG_PAGE_DATA_API)
//     console.log("category id ", categoryId)
//         const response = await apiConnector("POST", catalogData.CATALOG_PAGE_DATA_API, 
//         {categoryId: categoryId,});
    
//         if(!response?.data?.success){
//             throw new Error("Could not Fetch Category page data");
//         }
//         console.log("response : ",response)
//         console.log("response data: ",response?.data)
//         console.log("response data data : ",response?.data?.data)
//          result = response?.data;
//      console.log("result: ",result)
//      return result;
//   }
//   catch(err) {
//     console.log("catalog page data api err: ", err.message);
//     toast.error(err.message);
//     result = err.response?.data;
//     return result
//   }
//   toast.dismiss(toastId);
//     console.log("result: ",result)
 
  
// }

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

    console.log("Response :", response);
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