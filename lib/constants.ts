// Single source of truth for every outbound link. Change here, the whole site follows.

const ADDRESS_QUERY = encodeURIComponent("990 Goderich St, Port Elgin, ON N0H 2C3");

export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`;

/** The current site's food page, until a menu page is commissioned. */
export const FOOD_MENU_URL = "https://www.sunsetfamilyfun.com/food";
export const FACEBOOK_URL = "https://www.facebook.com/SunsetFamilyFunCentre";
