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

# ex: get_test_result_color success
# ex: get_test_result_color failure
# ex: get_test_result_color cancelled
# ex: get_test_result_color skipped
get_test_result_color() {
  if [[ $1 == "success" ]]; then
    echo "brightgreen"
    return 0
  fi

  if [[ $1 == "failure" ]]; then
    echo "red"
    return 0
  fi

  echo "yellow"
}
