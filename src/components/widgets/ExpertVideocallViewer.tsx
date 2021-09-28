/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";

export const  ExpertVideocallViewer : React.FunctionComponent = () => {
  
    //const viewport = useActiveViewport();
    //const [endpointId, setApiEndpointId] = React.useState<number>(0);

    // useEffect(() => {      
    //   const apiEndpoint = apiEndpoints.find(ae => ae.id === endpointId)!;
    //   // if(IModelApp.viewManager.decorators && IModelApp.viewManager.decorators.length > 0) {
    //   //   IModelApp.viewManager.decorators.forEach(dec => {
    //   //     IModelApp.viewManager.dropDecorator(dec);    
    //   //   });
    //   // }
    //   if(apiEndpoint) {
    //     IModelApp.viewManager.addDecorator(new SmartDeviceDecorator(viewport!, apiEndpoint))
    //   }
    // }, [ viewport, endpointId]); 

  // Combines the control pane and the component container to create the final display
  // For more implementation details about the layout of the component container, code and documentation is available in ../CommonComponentTools/ComponentContainer.tsx
  
    return (    
      <div >
        <iframe src="https://demo.telepresenz.com/" 
                allow="camera *;microphone *" 
                name="myiFrame" 
                scrolling="no" 
                frameBorder="1"
                height="600px"
                width="600px"
                title="videocall"
                ></iframe>      
      </div>  
        
    )
}
export default ExpertVideocallViewer;