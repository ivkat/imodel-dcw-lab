import "./App.scss";

import { Viewer } from "@itwin/web-viewer-react";
import React, { useEffect, useState } from "react";

import AuthorizationClient from "./AuthorizationClient";
import { Header } from "./Header";
import { IModelApp, IModelConnection, ScreenViewport } from "@bentley/imodeljs-frontend";
import { DisplayStyleSettingsProps } from "@bentley/imodeljs-common";
import { SmartDeviceDecorator } from "./components/decorators/SmartDeviceDecorator";
import { SelectEndpointWidgetProvider } from "./components/providers/SelectEndpointWidgetProvider";
import { ExpertVideocallWidgetProvider } from "./components/providers/ExpertVideocallWidgetProvider";

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(
     AuthorizationClient.oidcClient
       ? AuthorizationClient.oidcClient.isAuthorized
       : false    
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const initOidc = async () => {
      if (!AuthorizationClient.oidcClient) {
        await AuthorizationClient.initializeOidc();
      }

      try {
        // attempt silent signin
        await AuthorizationClient.signInSilent();
        setIsAuthorized(AuthorizationClient.oidcClient.isAuthorized);        
      } catch (error) {
        // swallow the error. User can click the button to sign in
        console.log('auth error', error)
      }
    };
    initOidc().catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!process.env.IMJS_CONTEXT_ID) {
      throw new Error(
        "Please add a valid context ID in the .env file and restart the application"
      );
    }
    if (!process.env.IMJS_IMODEL_ID) {
      throw new Error(
        "Please add a valid iModel ID in the .env file and restart the application"
      );
    }
  }, []);

  useEffect(() => {
    if (isLoggingIn && isAuthorized) {
      setIsLoggingIn(false);
    }
  }, [isAuthorized, isLoggingIn]);

  const onLoginClick = async () => {
    setIsLoggingIn(true);
    await AuthorizationClient.signIn();
  };

  const onLogoutClick = async () => {
    setIsLoggingIn(false);
    await AuthorizationClient.signOut();
    setIsAuthorized(false);
  };

  const uiProviders = [new SelectEndpointWidgetProvider(), new ExpertVideocallWidgetProvider()];
  const onIModelConnected = (_imodel: IModelConnection) => {

    IModelApp.viewManager.onViewOpen.addOnce(async (vp: ScreenViewport) => {

      const viewStyle: DisplayStyleSettingsProps = {
        viewflags: {
          visEdges: false,
          shadows: true
        }
      }

      vp.overrideDisplayStyle(viewStyle);

      //console.log('Smart Device Data', await SmartDeviceAPI.getData());
      // const endpoints = apiEndpoints;
      // console.log("endpoints in app", endpoints);
      
      IModelApp.viewManager.addDecorator(new SmartDeviceDecorator(vp, undefined!));
    })

  }

  return (
    <div className="viewer-container">
      <Header
        handleLogin={onLoginClick}
        loggedIn={isAuthorized}
        handleLogout={onLogoutClick}
      />
      {isLoggingIn ? (
        <span>"Logging in...."</span>
      ) : (
        isAuthorized && (
          <Viewer
            contextId={process.env.IMJS_CONTEXT_ID ?? ""}
            iModelId={process.env.IMJS_IMODEL_ID ?? ""}
            authConfig={{ oidcClient: AuthorizationClient.oidcClient }}
            onIModelConnected={onIModelConnected}
            uiProviders={uiProviders}
          />
        )
      )}
    </div>
  );
};

export default App;