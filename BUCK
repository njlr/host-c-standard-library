cc = read_config('cxx', 'cc') or 'cc'

genrule(
  name = 'headers', 
  out = 'include', 
  srcs = [
    'index.js', 
    'consumer_c99.c', 
  ], 
  cmd = 'export CC=' + cc + ' && node $SRCS $OUT', 
)

genrule(
  name = 'system-framework', 
  out = 'System.framework', 
  cmd = ' && '.join([
    'mkdir -p $OUT', 
    'cp -r /System/Library/Frameworks/System.framework/System $OUT/System', 
    'cp -r /System/Library/Frameworks/System.framework/Resources $OUT/Resources', 
  ]), 
)

prebuilt_apple_framework(
  name = 'system', 
  framework = ':system-framework', 
  preferred_linkage = 'static', 
)

prebuilt_cxx_library(
  name = 'c-standard-library', 
  header_dirs = [
    ':headers', 
  ], 
  header_only = True, 
  deps = [
    ':system', 
  ], 
  visibility = [
    'PUBLIC', 
  ], 
)

cxx_binary(
  name = 'hello', 
  srcs = [
    'hello.c', 
  ],
  deps = [
    ':c-standard-library', 
  ], 
)
