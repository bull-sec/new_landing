export default {
    // This regex will be matched to any url passed to the NavPane
    // If it matches, the navigation will happen, 
    // otherwise it will throw an error and not navigate
    "navigationRegex": "bullsec.xyz$",

    // The links that will be displayed as buttons on the main page
    "links": [
        {
            "text": "Bullsec Blog",
            "url": "https://blog.bullsec.xyz"
        },
        {
            "text": "Hacking Notes",
            "url": "https://noets.bullsec.xyz"
        }
    ],

    // The social media buttons displayed at the bottom of the page
    // The key is used to determine the icon, located in the public/icons folder
    "social": [
        {
            "key": "twitter",
            "url": "https://twitter.com/bullsec"
        },
        {
            "key": "instagram",
            "url": "https://www.instagram.com/"
        },
        {
            "key": "youtube",
            "url": "https://www.youtube.com/"
        },
        {
            "key": "linkedin",
            "url": "https://www.linkedin.com/"
        }
    ]
}