import { DecorateContext, Decorator, IModelConnection, Marker, ScreenViewport } from "@bentley/imodeljs-frontend";
import { SmartDeviceMarker } from "../markers/SmartDeviceMarker";
import { SmartDeviceAPI } from "../../SmartDeviceAPI";
import { IApiEndpoint } from "../interfaces/IApiEndpoint";

export class SmartDeviceDecorator implements Decorator {
  private _iModel: IModelConnection;
  private _markerSet: Marker[];

  constructor(private vp: ScreenViewport, private endpoint: IApiEndpoint) {
    this._iModel = vp.iModel;
    this._markerSet = [];

    this.addMarkers();
  }

  private async getSmartDeviceData() {
    const query = `
      SELECT SmartDeviceId,
              SmartDeviceType,
              ECInstanceId,
              Origin
              FROM CSimProductData.SystemComponent
              WHERE Origin IS NOT NULL
    `

    const results = this._iModel.query(query);
    const values = [];

    for await (const row of results)
      values.push(row);
    
    return values;
  }

  private async addMarkers() {
    //console.log('enters addMarkers');

    const values = await this.getSmartDeviceData();

    let cloudData: any;

    console.log("endpoint", this.endpoint);

    if(this.endpoint) {
      cloudData = await SmartDeviceAPI.getData(this.endpoint.url);
      console.log('cloud data', cloudData);

      console.log("values from CSIM db", values);
      
      values.forEach(value => {      
        
        const location = { x: value.origin.x, y: value.origin.y, z: value.origin.z };
        const size = { x: 40, y: 40 };
        //const smartDeviceId = value.smartDeviceId;

        const smartDeviceMarker = new SmartDeviceMarker(
          location,
          size,
          value.smartDeviceId,
          value.smartDeviceType,
          cloudData[value.smartDeviceId],
          value.id
        );

        this._markerSet.push(smartDeviceMarker);        
      })
    }
  }

  public decorate(context: DecorateContext): void {
    this._markerSet.forEach(marker => {
      marker.addDecoration(context);
    })
  }
}