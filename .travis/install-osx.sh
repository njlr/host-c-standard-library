# Java
brew tap caskroom/cask
brew tap caskroom/versions
brew cask install java8

#jenv
brew install jenv
if which jenv > /dev/null; then eval "$(jenv init -)"; fi
export PATH="$HOME/.jenv/shims:$PATH"
yes | jenv add /Library/Java/JavaVirtualMachines/*/Contents/Home/
jenv versions 
jenv global 1.8
java -version

# Watchman & Buck
brew tap facebook/fb
brew install watchman
brew install buck
