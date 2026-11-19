---
layout: post
title: "Putting the controllers down: what I learned building School of the Ancients for hands"
description: "How WebXR turns a pinch into a select or a grab, and what we built so a School of the Ancients lesson can be used from a chair while that path is still being tested."
date: 2026-11-19
permalink: /blog/putting-the-controllers-down/
---

In 2020 I watched Cosmos and saw the Pavilion of the Searchers. I wanted it to be real.

That is the opening line on my [Devpost entry](https://devpost.com/software/school-of-the-ancients-t275sh). The history under it:

> I made a first prototype for the Gemini API competition in 2024 and a VR build in Horizon Worlds in 2025. In 2026 the teacher and the exhibit show up in your actual room on Quest 3.

School of the Ancients is a WebXR app you open in Quest Browser. We've been developing and testing it for Meta Quest 3.

The Meta VR Start Developer Competition 2026 made hands and a chair the design. I submitted an entry on Nov 18. Three of the rules I wrote against:

> Fully usable with hands end-to-end. Controller support optional. Can someone complete the entire experience without ever pairing a controller?

> Designed for seated/stationary use. Limit roomscale or large physical movement. The 'airplane seat test'—does every interaction work in a 2ft radius?

> Satisfying in ≤10 minutes. The 'one bus stop test'

Those are the contest's requirements. For the competition we built hands-first controls: point-and-pinch to select, grab to move, two-hand turn and resize, and a hand menu. Matt tested it on a Quest 3 with his hands, no controllers. On that Devpost entry I wrote, "I can grab it, resize it, and point to a part."

## How a headset sees your hand

Hand input is the W3C WebXR Hand Input Module, Level 1. The page requests the `hand-tracking` feature when it starts an XR session. Skip that and the session can offer no hand-based input: `hand` is null, controllers may still appear, and no skeleton arrives.

With the feature granted, each hand is 25 joints. `XRHand` reports a size of 25, and a missing joint is emulated rather than dropped. Order is the wrist, then the thumb, then index, middle, ring, and little finger. The thumb has four: metacarpal, proximal phalanx, distal phalanx, tip. Each other finger has five: metacarpal, proximal, intermediate, distal, tip. No intermediate phalanx on the thumb, so a five-per-finger loop is already wrong.

Each joint has a pose (where it is, which way it points) and a radius (a sphere that roughly touches the skin on both sides). Poses come from the frame. A partly hidden hand is all or nothing: every joint, or none.

The hand is an input source beside any controller, profile `generic-hand-select`, meaning it can perform the primary action. The gesture is the button. Select arrives as `selectstart`, then `select`, then `selectend`. A pinch is how a hand fires that trio. Squeeze, the grab, is `squeezestart`, `squeeze`, `squeezeend`.

The spec on why one pinch is not one meaning:

> For many physical hand input sources, there can be overlap between the gestures used for the primary action and the squeeze action. For example, a pinch gesture may indicate both a "select" and "squeeze" event, depending on whether you are interacting with nearby or far away objects.

Point-and-pinch from a distance is select. The hand aims a target ray, an origin and a direction, at a part you are not holding. The pinch selects that part and leaves it where it is. Grabbing up close is squeeze: the hand is on a nearby object, the pinch holds it, and the object follows until you release.

Near versus far is a hint, and a pinch may be both events. Pages often assume the two are independent, so a browser may report squeeze as a separate "grasp button" on a profile derived from `generic-hand-select-grasp`. A tabletop exhibit is near enough to grab and full of parts you might mean to choose. The pinch does not say which. The page has to.

## The hands that weren't there

Our setup reserved input slots for the controllers and stopped. I joined with both controllers still paired, pinched, and the lesson did not move. Tracking was on. The hands were dropped, because the controllers already filled the list.

We built room for hands and controllers at once, and a way to show which inputs are live. Count your input sources. A hand does not replace a controller when tracking starts. They can be listed together.

## A pinch means two things

I pinched a part to move an exhibit. The pinch started a grab and also selected that part, so the teacher heard about a new selection every time I carried the model. I had not chosen anything.

The rule we built waits for release. At the pinch, note the part, and do not select yet. On release, it becomes the selection only if the hand ended roughly where it began. A pinch that carries the exhibit moves it and selects nothing. A second hand, the turn and resize we built, selects nothing.

No distance cutoff. The claim that rule is for: "It knows which part you've selected." A pinch that stays selects. A pinch that travels moves.

## Designing for a chair

The airplane seat test, quoted above, asks whether an interaction works in a 2ft radius without room-scale walking. We built toward it. This is not a claim that the build passes the airplane seat test.

With no room scan, our world floor once sat at the wearer's eyes, so "ground" was face height. We built floor height to come from the headset's `local-floor` space until a real surface is measured. That space is WebXR's estimate of the floor under you at session start, up still up, with no boundary to walk. Plane detection, the feature that reports a surface the device has found, stays optional. Require one, and a session with no scan has nowhere to put the lesson.

We built the exhibit to sit on a table, and to keep floor height even when the headset has no room scan yet, so it can be used while seated. We've tested that in a Quest 3 emulator; a worn-headset check is still to come. We built the hand menu off-center and within reach.

One thing I learned from wearing the headset is how quickly a lesson falls apart if the professor asks you to point at something that hasn't arrived yet. A ray needs a target already in the room. The one bus stop test is the contest's question about a short sitting, and the talking has to stay with what is in front of you.

## Voice when the browser can't listen

Quest Browser has no Web Speech API, so the usual recognition call is not there. We built a separate speech-to-text path, and a hold-to-speak pinch as the fallback: hold the pinch while you speak, release when you stop.

We built a live-voice welcome and a guided intro lesson, and a voice teacher talks you through a guided lesson, checks your answers as you point at parts, and awards XP and a level-up. On the headset, I've heard the welcome speak; the full intro has been walked through in the browser, and we're still testing the complete path on Quest.

"We're working on speed, so talking to your mentor feels like a real conversation and exhibits show up while you keep learning."

## What a lesson looks like now

The lesson, in the claims we make for it. "Learn with an AI historical mentor. Ask how something works, talk it through, and explore a 3D exhibit of what you asked about." "Your mentor and exhibits appear right in your real room." "Your mentor points at the parts as he explains them." "It knows which part you've selected." "Your mentor checks your understanding with a question about the exhibit in front of you, and gives a hint when you ask for one."

"Ask for something that isn't in the library and it gets built in Blender and loaded into your room." "If the library already has a fit, it loads that instead." The way I describe one of those asks: the learner asks for "a spaceship with solar panels and an ion engine." "The gold pulses trace electricity from the wings. The violet pulses trace xenon from the tank."

"Finish a mini lesson and you earn XP, level up, and unlock achievements."

From here:

"We're building a mentor, not an answer machine: AI that teaches you how to think, not what to memorize." "Learn by doing. The goal is exhibits you can take apart, run, and test, not just look at." "We're designing every lesson around one loop: learn it, try it yourself, reflect, and explain it back in your own words." "We're bringing mentors to more of the devices you already have, starting with phones."

"This is not yet a public, self-service hosted product."

"Professors are AI portrayals inspired by historical figures, not authentic voices or recordings. Generated explanations and exhibits can need correction."

"We're building this with a small invite-only group first." If you want to be part of that group, [join the early-access waitlist](https://schooloftheancients.com/#early-access).

---

**Sources**

- Matt Topham, [School of the Ancients on Devpost](https://devpost.com/software/school-of-the-ancients-t275sh) (the Pavilion of the Searchers line; the prototype history through Quest 3; "I can grab it, resize it, and point to a part"; "how quickly a lesson falls apart if the professor asks you to point at something that hasn't arrived yet").
- Meta VR Start Developer Competition 2026, published rules, as quoted above: hands end-to-end, seated or stationary use and the airplane seat test, and the one bus stop test.
- W3C, [WebXR Hand Input Module — Level 1](https://www.w3.org/TR/webxr-hand-input-1/) (`hand-tracking` feature, 25 joints, joint radius, profile `generic-hand-select`, pinch as both select and squeeze, `generic-hand-select-grasp`).
- W3C, [WebXR Device API](https://www.w3.org/TR/webxr/) (input sources, the target ray, `select` and `squeeze` events, the `local-floor` reference space).
- W3C, [WebXR Plane Detection Module — Level 1](https://www.w3.org/TR/webxr-plane-detection-1/) (detected planes, which we treat as optional).
- W3C Community Group, [Web Speech API](https://wicg.github.io/speech-api/) (the browser speech-recognition interface; Quest Browser has no Web Speech API).
