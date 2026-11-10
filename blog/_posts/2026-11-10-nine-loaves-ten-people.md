---
layout: post
title: "Nine loaves, ten people: a lesson from an Egyptian math textbook"
description: "About 3,500 years ago a scribe named Ahmose worked out how to share 9 loaves among 10 men. His answer looks strange to us, and it teaches something about learning by doing."
date: 2026-11-10
permalink: /blog/nine-loaves-ten-people/
---

This one is a lesson, so let's do it the way a Professor would: a question first, then your guess, then the explanation.

## The question

You have 9 loaves of bread and 10 workers. Everyone has to get the same amount, and all the bread has to be handed out. How much does each worker get?

Take a second and actually answer it before you read on.

## Your guess

Most of us say "nine tenths of a loaf" without really thinking. 9 divided by 10 is 9/10. Done.

That's correct. It's also not the answer an Egyptian scribe would have written down.

## The explanation

The problem is real. It's Problem 6 in the Rhind Mathematical Papyrus, which is now in the British Museum (EA 10057). The museum describes it as "probably a mathematics textbook, used by scribes to learn to solve particular mathematical problems by writing down appropriate examples." A scribe named Ahmose copied it, and he dated his copy to year 33 of the Hyksos king Apophis, around 1550 BC. He also says he was copying an older book.

Here is Problem 6 in Arnold Buffum Chace's translation:

> "Divide 9 loaves among 10 men. Each man receives 2/3 1/5 1/30."

So the answer is two thirds, plus one fifth, plus one thirtieth of a loaf.

Check it. Put everything over 30: 20/30 + 6/30 + 1/30 = 27/30, which is 9/10. Same amount as your answer. The scribe just wrote it in a different way.

Why write it like that? Egyptian arithmetic worked with whole numbers and *unit fractions*, fractions with a 1 on top like 1/5 or 1/30. Chace notes that a result had to be expressed "using only integers and different unit fractions." The one famous exception was 2/3, which had its own sign. "Nine tenths" wasn't a thing you could write. You had to build it out of pieces.

Then the scribe proves his answer, and this is the part I love. He doesn't divide again. He multiplies the share by 10 and checks that he gets 9 loaves back. And he doesn't multiply by 10 directly, because Egyptian multiplication worked by doubling:

| | one man's share, times... |
|---|---|
| 1 | 2/3 1/5 1/30 |
| 2 | 1 2/3 1/10 1/30 |
| 4 | 3 1/2 1/10 |
| 8 | 7 1/5 |

Since 10 = 2 + 8, he adds the 2 row and the 8 row: 1 2/3 1/10 1/30 plus 7 1/5. That comes to exactly 9. Chace's translation ends the problem with "Total 9 loaves, which is correct."

So the lesson in this textbook isn't really "9 ÷ 10." It's how to break a quantity into parts you can name, how to double, and how to check your own answer by running it backwards.

## What the Greeks noticed

More than a thousand years later, Plato was impressed by how Egyptian children learned arithmetic. In Book 7 of the *Laws*, his Athenian speaker says Greek children should learn as much as "the innumerable crowd of children in Egypt learn along with their letters." Then he describes how:

> "lessons have been invented for the merest infants to learn, by way of play and fun,—modes of dividing up apples and chaplets, so that the same totals are adjusted to larger and smaller groups"

Teachers, he says, also mix up bowls of gold, bronze and silver and have the children sort and share them out, "adapting the rules of elementary arithmetic to play."

One caution: that's a Greek philosopher describing Egypt, and the *Laws* is our source for the apples. But put it next to the Rhind papyrus and you see the same idea. Fractions start as real things you hand out to real people. A loaf, an apple, a garland. You split it, you count it, and you check that nobody got shorted.

## Why this matters for what we're building

When I read Problem 6, I picture the loaves. Nine of them on a table, ten people, and a knife. The math gets easier the second you can see it.

That's the thing School of the Ancients is built around. "Learn with an AI historical mentor. Ask how something works, talk it through, and explore a 3D exhibit of what you asked about." "Your mentor checks your understanding with a question about the exhibit in front of you, and gives a hint when you ask for one."

The scribe's method goes further than looking, though. He makes you do the work and then check it yourself. That's where we're headed: "Learn by doing. The goal is exhibits you can take apart, run, and test, not just look at." And "We're designing every lesson around one loop: learn it, try it yourself, reflect, and explain it back in your own words."

The Rhind papyrus is a reminder that this isn't a new idea. It's very old. "We're building a mentor, not an answer machine: AI that teaches you how to think, not what to memorize." Ahmose would have gotten it. He didn't just write down 9/10. He showed you how to get there and how to prove you were right.

"Professors are AI portrayals inspired by historical figures, not authentic voices or recordings. Generated explanations and exhibits can need correction." "This is not yet a public, self-service hosted product." "We're building this with a small invite-only group first." If you want to be part of that group, [join the early-access waitlist](https://schooloftheancients.com/#early-access).

---

**Sources**

- British Museum, [The Rhind Mathematical Papyrus, EA 10057](https://www.britishmuseum.org/collection/object/Y_EA10057) (description as a textbook, scribe Ahmose, year 33 of Apophis, c. 1550 BC, 84 problems).
- Arnold Buffum Chace, *The Rhind Mathematical Papyrus*, vol. 1 (Mathematical Association of America, 1927), Problem 6 and introduction, [Internet Archive](https://archive.org/details/TheRhindPapyrusVolume1).
- Robert Gardner, [notes on Eves, *An Introduction to the History of Mathematics*, §2.8](https://faculty.etsu.edu/gardnerr/3040/Notes-Eves6/Eves6-2-8.pdf) (Problems 1–6 divide 1, 2, 6, 7, 8 and 9 loaves among 10 men; unit fractions except 2/3).
- Plato, *Laws* 7.819a–c, trans. R. G. Bury (Loeb, 1967–68), [Perseus Digital Library](https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0166:book=7:section=819b).
