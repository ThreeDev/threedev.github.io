# ThreeDev.github.io

## Run Locally

```
[threedev.github.io]-> docker run --rm -v "${PWD}:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll:builder bash
```

```
bash-5.0# bundle config set --local path 'vendor/bundle'
bash-5.0# bundle install
bash-5.0# bundle exec jekyll serve -s docs/ --verbose --host 0.0.0.0 --watch
```
