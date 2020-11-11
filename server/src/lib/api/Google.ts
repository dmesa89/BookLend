import { google } from "googleapis";
import {
  AddressComponent,
  Client,
  GeocodingAddressComponentType,
  AddressType,
} from "@googlemaps/google-maps-services-js";

const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`
);

const parseAddress = (addressComponents: AddressComponent[]) => {
  let country = null;
  let state = null;
  let city = null;

  for (const component of addressComponents) {
    for (const aComponent of component.types) {
      if (aComponent === "country") {
        country = component.long_name;
      }
      if (aComponent === "administrative_area_level_1") {
        state = component.long_name;
      }
      if (aComponent === "locality") {
        city = component.long_name;
      }
    }
  }

  return { country, state, city };
};

export const Google = {
  authUrl: auth.generateAuthUrl({
    // eslint-disable-next-line @typescript-eslint/camelcase
    access_type: "online",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),
  logIn: async (code: string) => {
    const { tokens } = await auth.getToken(code);

    auth.setCredentials(tokens);

    const { data } = await google.people({ version: "v1", auth }).people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names,photos",
    });

    return { user: data };
  },
  geocode: async (address: string) => {
    const client = new Client({});
    const res = await client
      .geocode({
        params: {
          address,
          key: `${process.env.G_GEOCODE_KEY}`,
        },
        timeout: 1000,
      })
      .then((r) => {
        return parseAddress(r.data.results[0].address_components);
      })
      .catch((e) => {
        throw new Error("failed to geocode address");
      });

    return res;
  },
};
