#!/usr/bin/env bash
# Runs every scripts/*_test.js (60s each) except scripts/known_failing_tests.txt.
cd "$(dirname "$0")/.."
skip=$(grep -v '^#' scripts/known_failing_tests.txt | grep -v '^$')
fail=0
for f in scripts/*_test.js; do
  n=$(basename "$f")
  if echo "$skip" | grep -qx "$n"; then echo "SKIP $n"; continue; fi
  if timeout 60 node "$f" > /tmp/wm_test.log 2>&1; then echo "PASS $n"; else echo "FAIL $n"; tail -5 /tmp/wm_test.log; fail=1; fi
done
exit $fail
