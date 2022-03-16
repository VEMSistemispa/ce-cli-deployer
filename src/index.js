import xapi from "xapi";
import {
  PUBLISH_IDENTIFIER,
} from "./EnvironmentData";

async function OnPanelClickAsync(event) {
  console.log("PANEL OPENED");
  switch (event.PanelId) {
    
  }
}

async function OnButtonClickedAsync(event) {
  if (event.Type !== "clicked") return;

  switch (event.WidgetId) {
    
  }
}

xapi.event.on("UserInterface Extensions Panel Clicked", OnPanelClickAsync);
xapi.Event.UserInterface.Extensions.Widget.Action.on(OnReleaseSliderValueAsync);
xapi.Event.UserInterface.Extensions.Widget.Action.on(OnButtonClickedAsync);

console.log("VERSION_PUBLISHED", PUBLISH_IDENTIFIER);