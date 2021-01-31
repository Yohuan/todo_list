# ex: get_test_coverage_color 95.67
get_test_coverage_color() {
  if (($(echo "$1 > 80" | bc -l))); then
    echo "brightgreen"
    return 0
  fi

  if (($(echo "$1 > 50" | bc -l))); then
    echo "yellow"
    return 0
  fi

  echo "red"
}
