var databaseName;


function getDatabaseName() {
    return databaseName;
}


function setDatabaseName(name) {
    databaseName = name;
}


function getTablesToIgnore() {
    return [
        'adaccounts_historical_sync',
        'ads_audiences_facebook_updates',
        'ads_audiences_labels',
        'ads_demographics_targeting',
        'ads_interests_targeting',
        'ads_locales_targeting',
        'ads_monitoring_exchange_rates',
        'currencies',
        'facebook_countries',
        'facebook_pages',
        'fb_ads_async_tasks',
        'fb_ads_errors',
        'fb_stats_tasks',
        'logged_errors',
        'ads_booking_targets',
        'ads_user_campaigns_settings',
        'fb_ad_campaign_groups',
        'fb_ad_campaigns',
        'fb_ads',
        'ads_audiences_facebook',
        'ads_audiences'
    ];
}


function getCustomColumnChecks() {
    return {
        ads_audiences: {
            social_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            last_error: {
                regularChecksToSkip: ['stringChecks.stringEqualToEmpty']
            },
            description: {
                regularChecksToSkip: ['stringChecks.stringEqualToEmpty']
            },
            is_visible: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            is_editable: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            retention_days: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero']
            },
            is_lookalike: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            audience_size: {
                regularChecksToSkip: ['numberChecks.numberIsNegative']
            }
        },
        ads_audiences_facebook: {
            operation_status_description: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull']
            },
            operation_status_code: {
                regularChecksToSkip: ['numberChecks.numberEqualToNull']
            }
        },
        adset_autoboost_pages: {
            fb_page_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            ig_channel_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero'],
                regularChecksToSkip: ['stringChecks.stringEqualToEmpty']
            }
        },
        facebook_pages: {
            link: {
                extraChecksToPerform: ['stringChecks.stringNonFacebookLink']
            },
            is_nonprofit: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            facebook_page_category_id: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero']
            },
            first_insights_gathering: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero']
            },
            tokens_count: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero']
            }
        },
        fb_ad_accounts: {
            ad_account_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            capabilities: {
                extraChecksToPerform: ['stringChecks.stringIsNotArray']
            },
            users: {
                extraChecksToPerform: ['stringChecks.stringIsNotAnObject']
            },
            is_connected: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            has_instagram_acc: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            timezone_offset_hours_utc: {
                regularChecksToSkip: ['numberChecks.numberIsNegative', 'numberChecks.numberEqualToZero']
            },
            offsite_pixel_tos_accepted: {
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            org_id: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull']
            },
            time_created: {
                regularChecksToSkip: ['dateChecks.dateEqualToNull']
            },
            last_token_sync: {
                regularChecksToSkip: ['dateChecks.dateEqualToNull']
            },
            last_sync: {
                regularChecksToSkip: ['dateChecks.dateEqualToNull']
            }
        },
        fb_ads_new: {
            fb_ad_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            fb_adset_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            fb_campaign_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            ad_data: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull'],
                extraChecksToPerform: ['stringChecks.stringIsNotAnObject']
            },
            instagram_link: {
                extraChecksToPerform: ['stringChecks.stringIsNotInstagramLink'],
                regularChecksToSkip: ['stringChecks.stringEqualToNull']
            },
            booking_id: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            dark_post: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            is_active: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            internal_ad: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            booking_error: {
                extraChecksToPerform: ['stringChecks.stringIsNotAnObject'],
                regularChecksToSkip: ['stringChecks.stringEqualToNull']
            },
            instagram_actor_id: {
                regularChecksToSkip: ['numberChecks.numberEqualToNull']
            },
            instagram_story_id: {
                regularChecksToSkip: ['numberChecks.numberEqualToNull']
            },
            ad_duration: {
                regularChecksToSkip: ['numberChecks.numberEqualToNull']
            },
            has_no_end: {
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            time_expires: {
                regularChecksToSkip: ['dateChecks.dateInTheFuture', 'dateChecks.dateEqualToNull']
            },
            gathered_on: {
                regularChecksToSkip: ['dateChecks.dateEqualToNull']
            },
            fb_page_id: {
                regularChecksToSkip: ['numberChecks.numberEqualToNull']
            },
            post_id: {
                regularChecksToSkip: ['numberChecks.numberEqualToNull']
            },
            update_hash: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            end_date: {
                regularChecksToSkip: ['dateChecks.dateInTheFuture', 'dateChecks.dateEqualToNull']
            },
            source: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull']
            },
            name: {
                regularChecksToSkip: ['stringChecks.stringTrimmed']
            }
        },
        fb_adsets: {
            is_daily: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            ad_duration: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero', 'numberChecks.numberEqualToNull']
            },
            ongoing: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            },
            genders: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero', 'numberChecks.numberEqualToNull']
            },
            age_max: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero']
            },
            age_min: {
                regularChecksToSkip: ['numberChecks.numberEqualToNull']
            },
            interval_days: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero', 'numberChecks.numberEqualToNull']
            },
            max_frequency: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero']
            },
            fb_adset_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            fb_campaign_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            fb_account_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            user_os: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            bid_strategy: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            instagram_actor_id: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty'],
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            app_id: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty'],
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            app_url: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            wireless_carrier: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            tracking_pixel_id: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            start_time: {
                regularChecksToSkip: ['dateChecks.dateInTheFuture']
            },
            end_time: {
                regularChecksToSkip: ['dateChecks.dateInTheFuture', 'dateChecks.dateEqualToNull']
            },
            gathered_on: {
                regularChecksToSkip: ['dateChecks.dateEqualToNull']
            },
            update_hash: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            name: {
                regularChecksToSkip: ['stringChecks.stringTrimmed']
            }
        },
        fb_campaigns: {
            fb_campaign_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            fb_account_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            start_time: {
                regularChecksToSkip: ['dateChecks.dateInTheFuture', 'dateChecks.dateIsDefault']
            },
            stop_time: {
                regularChecksToSkip: ['dateChecks.dateInTheFuture', 'dateChecks.dateEqualToNull']
            },
            update_hash: {
                regularChecksToSkip: ['stringChecks.stringEqualToNull', 'stringChecks.stringEqualToEmpty']
            },
            gathered_on: {
                regularChecksToSkip: ['dateChecks.dateEqualToNull']
            },
            name: {
                regularChecksToSkip: ['stringChecks.stringTrimmed']
            }

        },
        fb_pages: {
            id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            is_child_page: {
                regularChecksToSkip: ['numberChecks.numberEqualToZero'],
                extraChecksToPerform: ['numberChecks.numberNotZeroOrOne']
            }
        },
        fb_tokens: {
            fb_ad_account_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            channel_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            }
        },
        fb_user_access: {
            fb_ad_account_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            page_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            fb_user_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            }
        },
        fb_user_tokens: {
            fb_ad_account_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            fb_user_id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            }
        },
        ig_channels: {
            id: {
                extraChecksToPerform: ['stringChecks.stringIsEqualToZero']
            },
            picture: {
                extraChecksToPerform: ['stringChecks.stringIsNotURL']
            }
        }
    };

}


module.exports.getCustomColumnChecks = getCustomColumnChecks;
module.exports.getTablesToIgnore = getTablesToIgnore;
module.exports.getDatabaseName = getDatabaseName;
module.exports.setDatabaseName = setDatabaseName;


