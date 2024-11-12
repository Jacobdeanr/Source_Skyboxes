@echo off

ruby generate_skybox_pages.rb

bundle exec jekyll serve --force_polling
