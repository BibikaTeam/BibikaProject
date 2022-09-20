import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { toast } from "react-toastify";
import { IPaginationRequest, IRequestError } from "../../adminPanel/types";
import { shortSearch } from "../../home/service";
import { IBannerCar, IShortSearchRespond } from "../../home/types";
import { likePost } from "../../userCabinet/service";
import CarCard from "./carCard";

import { ICurrentCarDetailProps, IDetailSearchProps } from "../search/types";
import { getDetailPaginatedPosts } from "../search/serivce";
import SearchPanel from "../../home/searchPanel";
import TrendBlock from "../advertisment/trendBlock";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestData, setRequestData] = useState<IDetailSearchProps>({
    filters: [],
    countOnPage: 10,
    page: 1,
    search: "",
  });
  const { writeCars } = useActions();
  const { searchRespond } = useTypedSelector((x) => x.search);

  //create object for getting keys from ICurrentCarDetailProps
  let test: ICurrentCarDetailProps = {
    brandId: 0,
    carBodyId: 0,
    color: "",
    completeSetId: 0,
    engineId: 0,
    gearBoxId: 0,
    generationId: 0,
    location: "",
    modelId: 0,
    yearMax: 0,
    yearMin: 0,
    priceMin: 0,
    priceMax: 0,
  };

  useEffect(() => {
    (async () => {
      //@ts-ignore
      let params: ICurrentCarDetailProps = {};

      //Going for each of key, check can we parse it to int, and write to param object
      const keys = Object.keys(test);
      keys.forEach((x) => {
        //@ts-ignore
        params[x] = searchParams.get(x)
          ? //@ts-ignore
            isNaN(parseInt(searchParams.get(x)))
            ? //@ts-ignore
              searchParams.get(x)
            : //@ts-ignore
              parseInt(searchParams.get(x))
          : undefined;
      });

      const requestDataInside: IDetailSearchProps = {
        //@ts-ignore
        filters: [params],
        countOnPage: 10,
        page: 1,
        search: "",
      };
      setRequestData(requestDataInside);
      fetchDataByRequest(requestDataInside);
    })();
  }, [searchParams]);

  const fetchData = async () => {
    try {
      const data = await getDetailPaginatedPosts(requestData);
      writeCars(data as IPaginationRequest<IBannerCar>);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };
  const fetchDataByRequest = async (request: IDetailSearchProps) => {
    try {
      const data = await getDetailPaginatedPosts(request);
      writeCars(data as IPaginationRequest<IBannerCar>);
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  return (
    <div className="search-page">
      <SearchPanel searchProps={requestData.filters[0]}></SearchPanel>
      <TrendBlock />
      <div className="search-result">
        <h1>Search result</h1>
        {searchRespond?.data.map((x, id) => {
          return <CarCard car={x} />;
        })}
      </div>
    </div>
  );
};
export default SearchResult;
