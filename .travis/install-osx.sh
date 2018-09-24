# Java
brew tap caskroom/cask
brew tap caskroom/versions
brew cask install java8
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`

# Watchman & Buck
brew tap facebook/fb 
brew install watchman 
brew install buck 
