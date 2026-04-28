# par-website

The official website of the Par programming language.

This repo builds the static site for `par.run`. It owns the frontpage and blog,
then pulls generated docs, standard library docs, and the playground from the
Par language repository during the full build.

## Local development

```sh
npm install
npm run dev
```

## Full static build

The full build expects a local checkout of the language repository next to this
repo by default:

```sh
PAR_LANG_DIR=/Users/faiface/par-lang npm run build:all
```

The final static artifact is written to `dist/`.
