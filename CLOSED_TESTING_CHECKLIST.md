# BreakSignal Closed Testing Checklist

Complete this checklist with the exact build intended for the Google Play closed testing track.

Closed testing is not complete until testers have installed the release-candidate build, completed the checks below, submitted feedback, and all blocker issues have been fixed or documented.

## Tester Instructions

- Use only the BreakSignal build provided for the closed testing track.
- Do not enter sensitive personal information in feedback.
- Attach screenshots or screen recordings only when they help explain a bug.
- Record any crash, blank screen, blocked flow, layout problem, or confusing behavior.
- Complete [CLOSED_TESTING_FEEDBACK_TEMPLATE.md](CLOSED_TESTING_FEEDBACK_TEMPLATE.md) after testing.

## Build Information

```text
App name: BreakSignal
Developer: WhiskersStack
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Version code:
Track:
Commit:
Build source:
Device(s):
Android version(s):
Tester:
Date:
```

## Store Metadata To Confirm

- Developer: WhiskersStack
- Support email: support@break-signal.com
- Support website: https://www.break-signal.com/
- Privacy policy: https://www.break-signal.com/privacy.html

## Install And Launch

- [ ] Install the app successfully.
- [ ] Confirm the BreakSignal launcher icon appears correctly.
- [ ] Launch the app.
- [ ] Confirm the dark branded splash screen appears correctly.
- [ ] Confirm the timer screen loads without a blank screen or crash.
- [ ] Close and reopen the app.
- [ ] Confirm the app launches again without reinstalling.

## Timer And Reminder Flow

- [ ] Start the timer.
- [ ] Pause the timer.
- [ ] Resume the timer.
- [ ] Reset the timer.
- [ ] Trigger a test break reminder.
- [ ] Complete a break.
- [ ] Snooze a break.
- [ ] Skip a break.
- [ ] Let a real timer interval complete and confirm the reminder appears.
- [ ] Confirm Done restarts the normal timer interval.
- [ ] Confirm Snooze starts the snooze interval.
- [ ] Confirm Skip returns to the normal timer flow.
- [ ] Confirm timer status and countdown remain understandable.

## Settings And Persistence

- [ ] Change the reminder interval.
- [ ] Change the snooze duration.
- [ ] Enable and disable break types.
- [ ] Change the selected preset.
- [ ] Enable and disable sound.
- [ ] Preview each sound option.
- [ ] Change the volume.
- [ ] Change the visual theme.
- [ ] Toggle compact mode.
- [ ] Confirm browser notification controls are not shown in Android.
- [ ] Close and reopen the app.
- [ ] Confirm saved settings load.
- [ ] Confirm settings still load after the device is restarted, if available.

## History And Local Data

- [ ] Confirm completed, snoozed, and skipped breaks appear in history.
- [ ] Confirm daily stats update.
- [ ] Confirm recent history remains local to the device.
- [ ] Clear history and confirm the action.
- [ ] Confirm clearing history removes recent entries without requiring an account.
- [ ] Confirm no account, login, analytics, or advertising UI appears.

## Layout And Accessibility

- [ ] Test portrait layout.
- [ ] Test a smaller screen size.
- [ ] Test with Android font size or display size increased, if available.
- [ ] Confirm no horizontal overflow.
- [ ] Confirm no text clipping.
- [ ] Confirm buttons and controls have comfortable tap targets.
- [ ] Confirm settings and history scroll correctly.
- [ ] Confirm modal content and actions remain accessible.
- [ ] Confirm keyboard or switch-style focus navigation works where available.
- [ ] Confirm text contrast and readability.

## Play Store Visual Capture

- [ ] Confirm the tested build is the release-candidate Android build before capturing screenshots.
- [ ] Confirm the app icon and splash screen use final BreakSignal branding.
- [ ] Confirm browser-only install, notification, SEO, and footer UI are hidden before capture.
- [ ] Capture portrait phone screenshots for the planned store sequence.
- [ ] Confirm screenshot captions and alt text match [play-store-assets/metadata/screenshot-captions.md](play-store-assets/metadata/screenshot-captions.md).
- [ ] Confirm screenshots contain no medical claims, Google Play badges, personal data, or unrelated app content.
- [ ] Confirm screenshot dimensions and quantity requirements in Play Console before upload.
- [ ] Confirm the 1024 x 500 px feature graphic is created separately from final BreakSignal branding.

## Stability

- [ ] Check for crashes during all tested flows.
- [ ] Check Android logs for app errors.
- [ ] Test with the device offline.
- [ ] Confirm the app still launches and the timer works offline.
- [ ] Confirm the timer only needs the app to remain open and does not promise background operation.
- [ ] Confirm local settings and history still work without internet access.
- [ ] Confirm website-only install, notification, SEO, and footer UI remain hidden in Android.

## Tester Feedback

Collect feedback using [CLOSED_TESTING_FEEDBACK_TEMPLATE.md](CLOSED_TESTING_FEEDBACK_TEMPLATE.md). At minimum, collect notes on:

- Timer clarity
- Button tap comfort
- Reminder modal clarity
- Visual professionalism
- Notification expectations
- Sound behavior
- Overall usefulness
- Bugs found, severity, and reproduction steps
- Final tester verdict: pass, pass with notes, or fail

## Final Sign-Off

- [ ] All blocking defects are fixed or documented.
- [ ] Tester feedback has been reviewed.
- [ ] Privacy policy and Data Safety notes match the tested build.
- [ ] Store listing and screenshots match the tested build.
- [ ] No signing secrets or release binaries are tracked by Git.
- [ ] Confirm the signed AAB used for closed testing was generated locally and not committed to Git.
- [ ] The next `versionCode` is unique for the planned upload.
- [ ] Closed testing is complete and the release candidate is ready for the next manual Play Console step.
