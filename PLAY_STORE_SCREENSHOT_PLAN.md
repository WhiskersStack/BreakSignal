# BreakSignal Play Store Screenshot Plan

Use real screens from the final Android release candidate. Keep screenshots dark, calm, readable, and free of medical claims.

The current Play Store visual asset set is tracked in [play-store-assets/metadata/screenshot-captions.md](play-store-assets/metadata/screenshot-captions.md). Phone screenshots were captured from the installed BreakSignal Android app on the `Pixel_8` emulator at `1080 x 1920`; the feature graphic was created at `1024 x 500`.

Before final upload, re-check the assets against the final release-candidate build and current Google Play Console requirements.

## Current Planning Requirements

Verify the current requirements directly in Google Play Console before final upload.

### App Icon

- Format: 32-bit PNG with alpha
- Size: 512 x 512 px
- Maximum file size: 1024 KB

### Feature Graphic

- Format: JPEG or 24-bit PNG with no alpha
- Size: 1024 x 500 px

### Phone Screenshots

- Minimum required: 2 screenshots across supported device types
- Recommended for apps: at least 4 screenshots
- Maximum screenshots per supported device type: 8
- Format: JPEG or 24-bit PNG with no alpha
- Minimum dimension: 320 px
- Maximum dimension: 3840 px
- Maximum dimension cannot be more than twice the minimum dimension
- Recommended portrait ratio: 9:16
- Recommended portrait size: at least 1080 x 1920 px

## Recommended Screenshot Sequence

| Order | Screen | File Path | What To Show | Caption | Alt Text | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Main timer | `play-store-assets/screenshots/phone-01-main-timer.png` | Clear timer, status, next break type, progress bar, and primary controls | Build a calmer break rhythm | BreakSignal main timer screen showing countdown, next break type, and timer controls. | Captured |
| 2 | Break reminder modal | `play-store-assets/screenshots/phone-02-reminder-modal.png` | Reminder message with Done, Snooze, and Skip | Pause when your reset signal arrives | BreakSignal reminder modal showing a break message with Done, Snooze, and Skip buttons. | Captured |
| 3 | Break type selection | `play-store-assets/screenshots/phone-03-break-types.png` | Eye, stretch, walking, posture, and focus-related break options | Choose reminders that fit your workday | BreakSignal break type selection screen with eye, stretch, walking, and posture options. | Captured |
| 4 | Settings and themes | `play-store-assets/screenshots/phone-04-settings-themes.png` | Cadence, alert tone, sound volume, presets, and visual theme controls | Tune the experience to your routine | BreakSignal settings screen showing reminder cadence, sound, volume, and theme controls. | Captured |
| 5 | Daily stats and history | `play-store-assets/screenshots/phone-05-stats-history.png` | Daily completed breaks, break-type breakdown, streak, and recent activity | See your recent break rhythm | BreakSignal activity history screen showing recent completed break entries. | Captured |

## Capture Setup

- Use the final release-candidate build and a representative Android phone.
- Use portrait orientation.
- Reset test data before the first screenshot.
- Use realistic settings and history entries.
- Keep text large enough to read at store-preview size.
- Keep system notifications, personal information, and unrelated apps out of frame.
- Use consistent theme, device frame treatment, and spacing.

## Visual Checklist

- BreakSignal icon and splash screen use final branding.
- Timer and status are immediately understandable.
- Controls are not clipped or crowded.
- Modal actions are visible without awkward scrolling.
- No horizontal overflow appears.
- No browser-only install, notification, SEO, or footer UI appears in Android.
- Screenshots contain no medical claims or guarantees.
- Screenshots show only features available in the release candidate.

## Feature Graphic Plan

- File path: `play-store-assets/feature-graphic/breaksignal-feature-graphic.png`.
- Target size: 1024 x 500 px.
- Format: JPEG or 24-bit PNG with no alpha.
- Concept: dark futuristic background with the BreakSignal circular timer/signal mark, subtle pause bars, calm cyan/violet glow, and a clean app-preview composition.
- Optional text: Protect your eyes, posture, and focus.
- Keep text minimal.
- Do not include Google Play badges, fake phone model names, rankings, pricing claims, medical claims, or large blocks of text.
- Status: Created.

## Remaining Manual Work

- Verify current Google Play screenshot dimensions and quantity requirements in Play Console before upload.
- Re-check screenshots and feature graphic against the exact final release-candidate build before upload.
- Replace any asset if the final Android build or Google Play requirements change.
