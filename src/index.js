import xapi from "xapi";
import {
  PUBLISH_IDENTIFIER,
  AMAZING_FEATURE_ENABLED_ONE,
  AMAZING_FEATURE_ENABLED_TWO,
  ROOM_NAME,
} from "./EnvironmentData";

const displayRoomOsAlert = (title, text, duration = 10) => {
  xapi.Command.UserInterface.Message.Alert.Display({
    Title: title,
    Text: text,
    Duration: duration,
  });
};

setInterval(() => {
  // We don't see it because we pass field2 equal to false
  if (AMAZING_FEATURE_ENABLED_TWO) {
    displayRoomOsAlert(ROOM_NAME, "The feature number two is disabled");
  }
}, 5000);

setInterval(() => {
  // We see it because we pass field1 equal to true
  if (AMAZING_FEATURE_ENABLED_ONE) {
    displayRoomOsAlert(ROOM_NAME, "The feature number one is enabled!!!");
  }
}, 5000);

// we log GUID so we know wich version of the script is published on the telepresence station
console.log("VERSION_PUBLISHED", PUBLISH_IDENTIFIER);
