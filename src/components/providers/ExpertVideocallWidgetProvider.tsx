/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import React from "react";
import { AbstractWidgetProps, StagePanelLocation, StagePanelSection, UiItemsProvider, WidgetState } from "@bentley/ui-abstract";
import { ExpertVideocallViewer } from "../widgets/ExpertVideocallViewer";

export const ExpertVideocallWidget: React.FunctionComponent = () =>  {

  return (
    
    <div className="sample-options">
    <div className={"sample-options-2col"} style={{ gridTemplateColumns: "1fr 1fr" }}>
      <span>Videocall Viewer</span>
      <br></br>
      {
      <ExpertVideocallViewer></ExpertVideocallViewer>
      }
    </div>
  </div>
  );
};

export class ExpertVideocallWidgetProvider implements UiItemsProvider {
  public readonly id: string = "ExpertVideocallWidgetProvider";

  public provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, _section?: StagePanelSection): ReadonlyArray<AbstractWidgetProps> {
    const widgets: AbstractWidgetProps[] = [];
    if (location === StagePanelLocation.Right) {
      widgets.push(
        {
          id: "ExpertVideocallWidget",
          label: "Expert Videocall",
          defaultState: WidgetState.Floating,
          // eslint-disable-next-line react/display-name
          getWidgetContent: () => <ExpertVideocallWidget />,
        }
      );
    }
    return widgets;
  }
}
