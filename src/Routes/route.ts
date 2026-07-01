export const APP_ROUTES = {
    BASE:"/",
    DASHBOARD:"/dashboard",
    COINPAGE:"/coin/:id",
    COMPARE:"/compare",
    WATCHLIST:"/watchlist"
}

export const buildRoute = {
  coinPage: (id: string) => `/coin/${id}`,
};