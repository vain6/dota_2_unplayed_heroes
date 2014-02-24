function getMatchHistory(key, account) {
    return "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=" + key + "&account_id=" + account;
}

function getYQLurl() {
    return "http://query.yahooapis.com/v1/public/yql";
}
