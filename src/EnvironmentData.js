
export const PUBLISH_IDENTIFIER = process.env.PUBLISH_IDENTIFIER;
export const ROOM_NAME = process.env.ROOM_NAME;

export const AMAZING_FEATURE_ENABLED_ONE = process.env.FIELD_1;
export const AMAZING_FEATURE_ENABLED_TWO = process.env.FIELD_2;

export const dev = process.env.NODE_ENV != 'production';

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