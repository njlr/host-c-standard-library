brew tap caskroom/cask
brew tap caskroom/versions
brew cask install java8
brew install jenv
if which jenv > /dev/null; then eval "$(jenv init -)"; fi
ls /Library/Java/JavaVirtualMachines/
jenv add /Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home/
jenv versions 
jenv global 1.8
brew tap facebook/fb
brew install watchman
brew install buck
