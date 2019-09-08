<template>
    <div id="app">
      Test
        <forecast-view :data="data" />
    </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            data: {
                id: 54357,
                published_time: "2019-08-19T13:30:00+00:00",
                expires_time: "2019-08-19T13:30:00+00:00",
                author: "Chris Lundy",
                product_type: "forecast",
                bottom_line: "<p>Stubborn wind slabs exist in unusual locations including well below ridgelines and on the sides of mid-slope gullies. Use visual clues like snow blown off of trees, new snow drifts, and fresh cornices to gauge where wind slabs have formed.</p><p>If the sun comes out, expect small, natural loose avalanches to occur on steep and rocky slopes.</p>",
                hazard_discussion: "<p>We have no recent observations post-weekend storm from this zone. Based on neighboring weather stations and radar and satellite information, we estimate 6-18 inches of snow fell Saturday night through Sunday in the Mountain Loop area and that moderate west winds moved a significant amount of snow around near and above treeline.</p>",
                announcement: null,
                status: "published",
                avalanche_center: {
                    id: "SNFAC",
                    name: "Sawtooth Avalanche Center",
                    url: "https://www.sawtoothavalanche.com/",
                    city: "Ketchum",
                    state: "ID"
                },
                forecast_zone: {
                    id: 293,
                    name: "Sawtooth Mountains",
                    url: "https://www.sawtoothavalanche.com/adv-sawtooth.php",
                    state: "ID"
                },
                warning: null,
                forecast_avalanche_problems: [
                    {
                        id: 129,
                        forecast_id: 54365,
                        avalanche_problem_id: 3,
                        rank: 1,
                        likelihood: ["likely", "likely"],
                        discussion: "<p>Strong winds formed stubborn, new slabs this weekend. Reports from the field in nearby zones indicate wind loading in unusual locations including much further down the slope than normal and on cross-loaded gully features. Wind slabs like this can be tricky. They often don’t seem very reactive. This can lure you out onto the slab. Using visual clues can help you identify and avoid wind loaded slopes. If you see fresh cornices, wind drifted snow, or feel firm, hollow, surface snow, wind slabs are nearby. We may see these slabs grow deeper at higher elevations, as moderate north winds transport more snow Monday.</p><p>If you use the nice weather to travel to higher elevations or into more remote areas take the time to stop and observe the snow. Due to stormy weather we have not received any information from higher elevations in quite some time.</p>",
                        media: [
                            {
                                url: "https://www.sawtoothavalanche.com/img/field/190413_titus_WL_ASc.jpg",
                                type: "photo",
                                caption: "Sample caption about the photo"
                            }
                        ],
                        location: [
                            "north upper",
                            "northeast upper",
                            "east upper",
                            "north middle",
                            "northeast middle"
                        ],
                        size: [
                            "2",
                            "3"
                        ],
                        name: "Wind Slab",
                        problem_description: "Wind Slab avalanches are the release of a cohesive layer of snow (a slab) formed by the wind. Wind typically transports snow from the upwind sides of terrain features and deposits snow on the downwind side. Wind slabs are often smooth and rounded and sometimes sound hollow, and can range from soft to hard. Wind slabs that form over a persistent weak layer (surface hoar, depth hoar, or near-surface facets) may be termed Persistent Slabs or may develop into Persistent Slabs.",
                        icon: "https://staging-api.avalanche.org/img/avalanche_problems/WindSlab.png"
                    },
                    {
                        id: 129,
                        forecast_id: 54365,
                        avalanche_problem_id: 3,
                        rank: 2,
                        likelihood: "unlikely",
                        discussion: "<p>Strong winds formed stubborn, new slabs this weekend. Reports from the field in nearby zones indicate wind loading in unusual locations including much further down the slope than normal and on cross-loaded gully features. Wind slabs like this can be tricky. They often don’t seem very reactive. This can lure you out onto the slab. Using visual clues can help you identify and avoid wind loaded slopes. If you see fresh cornices, wind drifted snow, or feel firm, hollow, surface snow, wind slabs are nearby. We may see these slabs grow deeper at higher elevations, as moderate north winds transport more snow Monday.</p><p>If you use the nice weather to travel to higher elevations or into more remote areas take the time to stop and observe the snow. Due to stormy weather we have not received any information from higher elevations in quite some time.</p>",
                        media: [
                            {
                                url: "cjqcJT35A2s",
                                type: "video",
                                caption: "Sample caption about the video"
                            }
                        ],
                        location: [
                            "south upper",
                            "southeast upper",
                            "east upper",
                            "south middle",
                            "southeast middle"
                        ],
                        size: [
                            "1.5",
                            "2.5"
                        ],
                        name: "Storm Slab",
                        problem_description: "Wind Slab avalanches are the release of a cohesive layer of snow (a slab) formed by the wind. Wind typically transports snow from the upwind sides of terrain features and deposits snow on the downwind side. Wind slabs are often smooth and rounded and sometimes sound hollow, and can range from soft to hard. Wind slabs that form over a persistent weak layer (surface hoar, depth hoar, or near-surface facets) may be termed Persistent Slabs or may develop into Persistent Slabs.",
                        icon: "https://staging-api.avalanche.org/img/avalanche_problems/StormSlab.png"
                    }
                ],
                danger: [
                    {
                        lower: 1,
                        upper: 3,
                        middle: 2,
                        valid_day: "current"
                    }
                ],
                media: [
                    {
                        id: 1,
                        url: "https://www.sawtoothavalanche.com/img/field/190413_titus_WL_ASc.jpg",
                        type: "photo",
                        caption: "This is the caption"
                    },
                    {
                        id: 2,
                        url: "https://www.sawtoothavalanche.com/img/field/180322_Keystone_crownprofile_SS.jpg",
                        type: "photo",
                        caption: "This is the caption"
                    },
                    {
                        id: 3,
                        url: "cjqcJT35A2s",
                        type: "video",
                        caption: "Video caption"
                    }
                ],
                weather_discussion: "<p>Cool NW flow has exceeded post-frontal snowfall accumulations in a few areas along the west slopes of the Cascades through early this afternoon. Those same areas, from Stevens Pass/Mountain Loop and south&nbsp;to&nbsp;Mt. Hood, will continue to see persistent snow showers through the early evening.&nbsp;It&nbsp;won't be until the flow aloft turns more northerly this evening that&nbsp;the showers&nbsp;really wind.&nbsp;</p>\n<p>Upper level ridging will build offshore and conditions will dry out tonight with clear skies expected in most locations. Some low clouds may get pulled into the Cascade Passes as light east flow develops. Other than the aforementioned low clouds in the Passes and some high clouds coming over the Olymipcs/north Cascades in the afternoon, generally sunny skies and cool temperatures are forecast on Monday.&nbsp; &nbsp;</p>\n<p>The upper level ridge will begin to flop over into southern B.C. on Tuesday, allowing more high clouds from a weak frontal&nbsp;boundary to push further south.&nbsp; Periods of high clouds are likely for northern half of the forecast area Monday night and Tuesday with diminishing cloud cover for areas further south. Freezing levels will begin to moderate Tuesday as warmer air works over the region.&nbsp;&nbsp;</p>",
                weather_data: [
                    {
                        data: [
                            {
                                field: "Temperature (F)",
                                values: [
                                    "12",
                                    "23",
                                    "15"
                                ]
                            },
                            {
                                field: "Cloud Cover",
                                values: [
                                    "Clear",
                                    "Scattered",
                                    "Broken"
                                ]
                            },
                            {
                                field: "Ridgeline Wind Speed",
                                values: [
                                    "Moderate",
                                    "Moderate",
                                    "Light"
                                ]
                            },
                            {
                                field: "Wind Direction",
                                values: [
                                    "SE",
                                    "E",
                                    "N"
                                ]
                            },
                            {
                                field: "Snowfall (in)",
                                values: [
                                    "3",
                                    "3",
                                    "3"
                                ]
                            },
                            {
                                field: "Snow Water Equivalent (in)",
                                values: [
                                    ".4",
                                    ".4",
                                    ".4"
                                ]
                            }
                        ],
                        periods: [
                            "<span>Last Night</span>(5PM - 5AM)",
                            "<span>Today</span>(5PM - 5AM)",
                            "<span>Tonight</span>(5PM - 5AM)"
                        ],
                        zone_id: 293,
                        zone_name: "Sawtooth Mountains"
                    },
                ],
            },
        }
    }
}
</script>

