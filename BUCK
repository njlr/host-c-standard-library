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

prebuilt_cxx_library(
  name = 'c-standard-library', 
  header_only = True, 
  header_dirs = [
    ':headers', 
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
