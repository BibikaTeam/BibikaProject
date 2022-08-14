import { Collapse, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllBrands } from "../../adminPanel/brand/service";
import { getGenerationsByModelId } from "../../adminPanel/generation/service";
import { getModelsByBrand } from "../../adminPanel/model/service";
import {
  IBrandModel,
  IModelModel,
  IGenerationModel,
  IRequestError,
} from "../../adminPanel/types";

import { Form } from "antd";

const { Panel } = Collapse;

const CollapseBar = () => {
  return (
    <Collapse>
      <Panel header={"ASd"} key={1}></Panel>
    </Collapse>
  );
};

export default CollapseBar;
