import { IModelConnection, ScreenViewport } from "@bentley/imodeljs-frontend";

export class Visualization {

  public static hideHouseExterior = async (vp: ScreenViewport) => {

    const categoryIds = await Visualization.getCategoryIds(vp.iModel);
    vp.changeCategoryDisplay(categoryIds, false);
  }

  private static getCategoryIds = async (iModel: IModelConnection) => {

    const categoriesToHide = [
      "'Default'",
    ]

    const query = `SELECT ECInstanceId FROM CSimProductData. SystemComponent WHERE UserLabel IN (${categoriesToHide.toString()})`;

    const result = iModel.query(query);
    const categoryIds = [];

    for await (const row of result)
        categoryIds.push(row.id);

    return categoryIds;
  }
} 