/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import React from "react";
import { AbstractWidgetProps, StagePanelLocation, StagePanelSection, UiItemsProvider, WidgetState } from "@bentley/ui-abstract";
import {ButtonList} from "../widgets/ButtonList"

export const SelectEndpointWidget: React.FunctionComponent = () =>  {

  return (
    
    <div className="sample-options">
    <div className={"sample-options-2col"} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <span>Select Endpoints:</span>
      <br></br>
      {
      <ButtonList></ButtonList>
      }
    </div>
  </div>
  );
};

export class SelectEndpointWidgetProvider implements UiItemsProvider {
  public readonly id: string = "ViewerOnly2dWidgetProvider";

  public provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, _section?: StagePanelSection): ReadonlyArray<AbstractWidgetProps> {
    const widgets: AbstractWidgetProps[] = [];
    if (location === StagePanelLocation.Right) {
      widgets.push(
        {
          id: "SelectEndpointsWidget",
          label: "Endpoints Selector",
          defaultState: WidgetState.Floating,
          // eslint-disable-next-line react/display-name
          getWidgetContent: () => <SelectEndpointWidget />,
        }
      );
    }
    return widgets;
  }
}
