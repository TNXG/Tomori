export const mxConfig = {
    endpoint: "https://mx.tnxg.top/api/v2",
};

export const SiteConfig = {
    ownerName: "天翔TNXG",
    SiteURL: "https://tnxgmoe.com",
    title: "天翔TNXGのNext空间站",
    description: "明日尚未到来，希望凝于心上",
    Language: 'zh-CN',
    avatar: 'https://api-space.tnxg.top/avatar?s=qq'
};

export const SocialLinkConfig = [
    {
        name: "GitHub",
        link: "https://github.com/TNXG",
        icon: 'mingcute:github-line'
    },
    {
        name: "Twitter",
        link: "https://twitter.com/iykrzu",
        icon: 'mingcute:twitter-line'
    },
    {
        name: "Telegram",
        link: "https://t.me/iykrzu",
        icon: 'mingcute:telegram-line'
    },
    {
        name: "RSS",
        link: "/feed.xml",
        icon: 'mingcute:rss-line'
    }
];

export const NavLinksConfig = [
    { name: "首页", href: "/" },
    { name: "归档", href: "/archive", dropdownItems: ["Anime", "Comics", "Games"] },
    { name: "关于", href: "/about" },
    { name: "友链", href: "/links" },
    { name: "留言", href: "/message" },
];

export const MiscellaneousConfig = {
    wordsPerMinute: 200
};