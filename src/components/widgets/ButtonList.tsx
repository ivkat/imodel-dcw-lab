/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button } from "@bentley/ui-core";
import { apiEndpoints } from "../constants/ApiEndpoints";
import { IModelApp } from "@bentley/imodeljs-frontend";
import { SmartDeviceDecorator } from "../decorators/SmartDeviceDecorator";
import { useActiveViewport } from "@bentley/ui-framework";
import { useEffect } from "react";

export const  ButtonList : React.FunctionComponent = () => {
  
    const viewport = useActiveViewport();
    const [endpointId, setApiEndpointId] = React.useState<number>(0);

    useEffect(() => {      
      const apiEndpoint = apiEndpoints.find(ae => ae.id === endpointId)!;
      // if(IModelApp.viewManager.decorators && IModelApp.viewManager.decorators.length > 0) {
      //   IModelApp.viewManager.decorators.forEach(dec => {
      //     IModelApp.viewManager.dropDecorator(dec);    
      //   });
      // }
      if(apiEndpoint) {
        IModelApp.viewManager.addDecorator(new SmartDeviceDecorator(viewport!, apiEndpoint))
      }
    }, [ viewport, endpointId]); 

  // Combines the control pane and the component container to create the final display
  // For more implementation details about the layout of the component container, code and documentation is available in ../CommonComponentTools/ComponentContainer.tsx
    
    return (
      <>
        <div id="component-container" className="component-container" >
         {
            apiEndpoints && apiEndpoints.map(endpoint =>
                (
                  <div className="component-example-container" key={endpoint.id}>
                    <div className="panel left-panel">
                      <span className="title">{endpoint.title}</span>
                      <span className="description">{`\n ${endpoint.description}`}</span>
                    </div>
                    
                    <div className="panel right-panel">
                      <Button onClick={() => {setApiEndpointId(endpoint.id)}} className="uicore-buttons-primary">{endpoint.buttonText}</Button>
                    </div>
                  </div>
                )              
            )
         }
        </div> 
      </>
    )
}
export default ButtonList;