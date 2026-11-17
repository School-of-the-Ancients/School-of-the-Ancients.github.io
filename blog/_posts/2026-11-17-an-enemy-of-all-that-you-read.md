---
layout: post
title: "An enemy of all that you read: Ibn al-Haytham's rule for learning from an AI"
description: "An eleventh-century scientist told his readers to attack every book they studied, his own teachers' included. That's the right way to learn from an AI mentor, too."
date: 2026-11-17
permalink: /blog/an-enemy-of-all-that-you-read/
---

There's a line I keep coming back to while we build School of the Ancients. It was written about a thousand years ago by a scientist who made part of his living copying out Ptolemy by hand, and then wrote a whole book of doubts about him.

The scientist is al-Hasan ibn al-Haytham, known in Latin Europe as Alhacen or Alhazen. The book is *Aporias against Ptolemy*. Here's the line, in A. I. Sabra's translation:

> "Thus the duty of the man who investigates the writings of scientists, if learning the truth is his goal, is to make himself an enemy of all that he reads, and, applying his mind to the core and margins of its content, attack it from every side. He should also suspect himself as he performs his critical examination of it, so that he may avoid falling into either prejudice or leniency."

I think this is the best one-paragraph guide I've found for how to learn from an AI. Here's why.

## Who he was

Ibn al-Haytham was an eleventh-century mathematician. According to A. I. Sabra, a historian of Arabic science, he is said to have been an official in the region around Basra, in what is now Iraq, before moving to Egypt. In Cairo he lived near the Azhar Mosque and supported himself by teaching and by copying Arabic translations of Greek classics, Euclid's *Elements* and Ptolemy's *Almagest* among them.

So this is someone who knew the ancient authorities about as well as anyone could. Sabra notes that he "greatly respected" Ptolemy. And still the word "doubt" shows up in the titles of several of his essays on Greek geometry, even ones written as commentaries.

That's the part I like. He didn't doubt Ptolemy because he didn't know him. He doubted him because he knew him well enough to see where the arguments were thin.

## Why he didn't trust the book

Just before that line, he gives his reasons. "The truths," he writes, "are immersed in uncertainties," and scientific authorities are "not immune from error." Then:

> "Therefore, the seeker after the truth is not one who studies the writings of the ancients and, following his natural disposition, puts his trust in them, but rather the one who suspects his faith in them and questions what he gathers from them, the one who submits to argument and demonstration, and not to the sayings of a human being whose nature is fraught with all kinds of imperfection and deficiency."

Notice there are two targets here. The first is the book. The second is you: "He should also suspect himself." Doubting the author isn't enough. You also have to watch for the moment you start going easy on an idea because you like it, or going hard on it because you don't.

## What "argument and demonstration" looks like

This could sound like plain contrarianism. It isn't, because he shows you what to do instead of trusting. You test.

His big book, the *Optics*, is, in Sabra's words, "wholly composed of systematically arranged experiments and geometrical proofs." One of my favorites is in Book I, chapter 6. He wants to know whether lights mix together when they pass through the same air. So he sets up several lamps in front of one small opening into a dark place, with a wall on the other side. On the wall you get one spot of light for each lamp, each on the straight line from its lamp through the opening.

Then he covers one lamp. Only the spot facing that lamp goes out. Uncover it, and the spot comes back. Whichever lamp you screen, only its own spot vanishes.

And he tells you how to check this yourself "at any time": go into a room with a two-panel door on a dark night, set lamps outside, close the door but leave a small gap, and look at the opposite wall.

His conclusion: all those lights came together at the opening and then separated again on the other side. If light blended in the air, they'd have come out mixed and you couldn't tell them apart. They don't. Each spot stays matched to its lamp.

(If you try it, you'll also see something the geometry forces: a lamp on the right puts its spot on the left side of the wall, because the straight lines cross at the opening. It's the same geometry as a pinhole camera.)

The point isn't the lamps. It's that he didn't ask you to believe him. He gave you a setup you could build with a door and a few lamps, and told you what you'd see if he was wrong.

## The answer machine problem

Here's where this hits what we're building.

An answer machine is very good at sounding like an authority. It writes in complete, confident paragraphs. It doesn't hesitate. That's exactly the kind of text Ibn al-Haytham says your "natural disposition" will want to trust.

An AI isn't "a human being whose nature is fraught with all kinds of imperfection and deficiency," but it has the same problem: it can be wrong. We say it plainly: "Professors are AI portrayals inspired by historical figures, not authentic voices or recordings. Generated explanations and exhibits can need correction."

So the useful question isn't "how do we make people trust the AI?" It's "how do we make the AI easy to attack?"

## What that means for School of the Ancients

"We're building a mentor, not an answer machine: AI that teaches you how to think, not what to memorize." For me, a big part of thinking is Ibn al-Haytham's habit: take what you're told, find the test, and run it.

A few things follow from that:

- **The thing should be in front of you.** What works today: "Learn with an AI historical mentor. Ask how something works, talk it through, and explore a 3D exhibit of what you asked about." An exhibit you can look at is something you can check the explanation against. If the mentor says a part does one thing and the model shows something else, you've caught it.
- **The mentor should ask, too.** "Your mentor checks your understanding with a question about the exhibit in front of you, and gives a hint when you ask for one." Being questioned is how you find out what you actually believe, which is Ibn al-Haytham's "suspect himself" step.
- **Doing beats reading.** "Learn by doing. The goal is exhibits you can take apart, run, and test, not just look at." That's the lamp-and-door idea: a claim you can poke at.
- **You should end by saying it yourself.** "We're designing every lesson around one loop: learn it, try it yourself, reflect, and explain it back in your own words." If you can explain why the spots on the wall don't mix, you didn't take it on trust.

None of this makes an AI mentor right all the time. It makes it something you can argue with, and I think that's the version worth building.

## Try it

Next time any source tells you something, whether it's a textbook, a video, or an AI, try his move. Ask: what's the door-and-lamps test for this? What would I see if it were wrong? Then go look.

"We're building this with a small invite-only group first." If you'd like to learn with a mentor you're allowed to argue with, join the early-access waitlist: [schooloftheancients.com/#early-access](https://schooloftheancients.com/#early-access).

---

**Sources**

- A. I. Sabra, "Ibn al-Haytham," *Harvard Magazine*, September–October 2003. Biography and his translation of the *Aporias against Ptolemy* passage. https://www.harvardmagazine.com/2003/09/ibn-al-haytham-html
- Ibn al-Haytham, *The Optics of Ibn al-Haytham, Books I–III: On Direct Vision*, translated with introduction and commentary by A. I. Sabra (London: Warburg Institute, 1989), Book I, chapter 6, paragraphs [85]–[87] (the lamps experiment).
