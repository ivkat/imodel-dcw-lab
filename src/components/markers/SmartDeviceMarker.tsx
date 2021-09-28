import { XAndY, XYAndZ } from "@bentley/geometry-core";
import { Marker, BeButtonEvent, IModelApp, NotifyMessageDetails, OutputMessagePriority, StandardViewId } from "@bentley/imodeljs-frontend";

export class SmartDeviceMarker extends Marker {
  private _smartDeviceId: string;
  private _smartDeviceType: string;
  private _elementId: string;

  constructor(location: XYAndZ, size: XAndY, smartDeviceId: string, smartDeviceType: string, cloudData: any | undefined, elementId: string) {
    super(location, size);

    this._smartDeviceId = smartDeviceId;
    this._smartDeviceType = smartDeviceType;
    this._elementId = elementId;
    this.setImageUrl(`/${this._smartDeviceType}.png`);
    this.title = this.populateTitle(cloudData);
  }

  private populateTitle(cloudData: any) {

    let smartTable = "";
    if(cloudData){
      for(const [key, value] of Object.entries(cloudData) ){
        smartTable += `
            <tr>
                <th>${key}</th>
                <th>${value}</th>
            </tr>
        `;
      }
    }
    const smartTableDiv = document.createElement("div");
    smartTableDiv.className = "smart-table";
    
    smartTableDiv.innerHTML = `
     <h3>${this._smartDeviceId}</h3>
     <table>
      ${smartTable}
     </table>
    `;

    return smartTableDiv;
  }
  
  public onMouseButton(_ev: BeButtonEvent): boolean {
    if (!_ev.isDown) return true;

    IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, "Equipment Inspection " + this._smartDeviceId + " selected"));
    IModelApp.viewManager.selectedView!.zoomToElements(this._elementId, { animateFrustumChange: true, standardViewId: StandardViewId.RightIso });

    return true;
  }

}