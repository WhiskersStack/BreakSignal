# Google Play Data Safety Notes

These notes are a draft for manually completing the Google Play Data Safety form. Re-check every answer against the exact release candidate before submission.

## Play Console References

- Privacy policy URL: https://www.break-signal.com/privacy.html
- Support email: support@break-signal.com

## Current Proposed Answers

| Question | Proposed answer | Evidence |
| --- | --- | --- |
| Does the app collect user data? | No | No backend, analytics, ads, external API calls, or account system are present. |
| Does the app share user data? | No | No third-party SDK or sharing flow sends app data. |
| Is data encrypted in transit? | Not applicable to app data | The app does not transmit user data. Cleartext Android traffic is disabled. |
| Can users request data deletion? | Not applicable to server data | Users can clear local history, clear app data, or uninstall the app. |
| Does the app contain ads? | No | No advertising SDK or ad code is present. |
| Does the app require an account? | No | There is no sign-up or login flow. |

## Local Data Used By The App

BreakSignal stores settings, preferences, counters, and recent break history locally using `localStorage`. This data is used only to provide the timer and reminder experience on the user's device.

The current app behavior is:

- No account system
- No ads
- No analytics
- No backend database
- No external API for core timer behavior
- No personal data collection
- No personal data sharing
- Local settings and history stay on device
- Not a medical device
- No medical advice

The Android app:

- Does not use a native notification plugin
- Does not request location, contacts, camera, microphone, or health permissions
- Has Android backup disabled
- Has cleartext network traffic disabled
- Declares the `INTERNET` permission as part of the Capacitor Android wrapper, but the current app code does not send user data to a remote API

## Code Review Evidence

The current code review found:

- No `XMLHttpRequest`, analytics, Firebase, advertising, login, or account integration
- No external JavaScript or iframe
- No backend endpoint or external API integration
- Service worker network requests limited to same-origin website assets
- Browser notifications requested only after an optional user action
- Browser notification controls hidden in the Android app

## Re-Review Triggers

Review and update the Data Safety form before release if any of these are added:

- Analytics, crash reporting, or advertising
- Native notifications or background services
- Accounts, login, or cloud sync
- External APIs or remote storage
- Location, health, contacts, camera, or microphone access
- Payments, subscriptions, or in-app purchases

## Manual Submission Note

Do not copy these answers into Google Play Console without reviewing the final release candidate and the current Play Console wording.
