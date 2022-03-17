
// inside environment configuration we can put every custom field we want
export const  getCustomRoomEnvironmentData = (element, publishGuid) => {
    return {
      PUBLISH_IDENTIFIER: publishGuid,
      ROOM_NAME: element.normalizedName,

      // those fields are the same one that are passed from your configuration file
      FIELD_1: element.additionalDetails.field1,
      FIELD_2: element.additionalDetails.field2,
    };
  }