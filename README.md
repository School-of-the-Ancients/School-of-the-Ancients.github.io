# School of the Ancients website

> **Repository status:** Public project website. See [rights and reuse](RIGHTS.md).
> For current application development, start with [Professor](https://github.com/School-of-the-Ancients/sota-professor)
> and the [dynamic creation platform](https://github.com/School-of-the-Ancients/matrix-loading-operator).
> Earlier descriptions below refer to this repository's own checkpoint; existing license grants remain intact.

This repository contains the public project website. Review [RIGHTS.md](RIGHTS.md)
for source and media permissions. Shared repository guidance is maintained in the
[organization policy repository](https://github.com/School-of-the-Ancients/.github/blob/9b4090df605b70ce313c198179662e19d3db568d/README.md).

## Privacy and contact pages

`privacy/index.html`, `terms/index.html`, and `copyright/index.html` provide the
public notices and contact routes. Review the stated data flows before deploying
changes to the hosted application. The copyright page does not claim that a DMCA
agent is registered. These pages do not establish legal clearance for avatars,
competition eligibility, or compliance by the separate legacy deployments.

The homepage opens either waitlist route only after the visitor selects “18 or
older.” The Tally iframe loads when the visitor selects “Load signup form.”
Visitors can also open the form on Tally. Optional analytics has its own consent
control. The standalone Tally form and its required fields are managed in the
form owner's Tally workspace. See [waitlist setup](WAITLIST_SETUP.md).

The blog and readable historical page use the bundled Inter Latin font under
`assets/fonts/Inter-OFL.txt`. Do not edit the byte-for-byte historical `.txt`
snapshot merely to remove its old external links.

Run `node --test tests/*.test.mjs`. Preview with a static server; blog post
generation still uses the existing GitHub Pages/Jekyll workflow.
