import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBrands } from "../brand/service";
import { IBrandModel, IRequestError } from "../types";

const AdminPanelPage = () => {
  const [brands, setBrands] = useState<Array<IBrandModel>>([]);
  useEffect(() => {
    (async () => {
      await setAllBrands();
    })();
  });

  const setAllBrands = () => {
    try {
      getAllBrands().then((data) => {
        setBrands(data);
      });
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  return () => {};
};

export default AdminPanelPage;
