# html-validate README

### (.htmlvalidate.json does not support JSON with comments)

\
By setting the root property to true the search is stopped. This can be used to prevent searching from outside the project directory or to use a specific configuration for a specific directory without loading project configuration.

With the configuration below, only the project root and src/ root will be searched for .htmlvalidation.json

`"root": true`

\
This is the default preset and enables most rules including standards validation,
WCAG and best practices. It is a superset of the other presets:

- html-validate:standard: Enables rules related to validating according to the WHATWG HTML standard (Living Standard).
  Use this preset if you want validation similar to the Nu Html Checker and similar tools.

- html-validate:a17y: Enables rules related to accessibility. Most rules but not all enabled rules
  relates to WCAG compliance. On its own it will not validate if the document/template itself
  is valid but only if accessibility issues can be found.
  https://html-validate.org/wcag.html

`"extends": ["html-validate:recommended"]`

\
used for 'no-unknown-elements'

`"elements": ["html5"]`

\
requires all elements to have a corresponding metadata element describing its content model.

`"no-unknown-elements": "error"`

\
All input elements must have an associated label. It is required for accessibility tools
to identify the purpose of the field.

`"input-missing-label": "error"`

\
Require all elements referenced by attributes such as 'for' to exist in the current document.

`"no-missing-references": "error"`
