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

# ex: get_test_result 0
# ex: get_test_result 1
get_test_result() {
  if [[ $1 == "0" ]]; then
    echo "Pass"
    return 0
  fi

  echo "Fail"
}

# ex: get_test_result Pass
# ex: get_test_result Fail
get_test_result_color() {
  if [[ $1 == "Pass" ]]; then
    echo "brightgreen"
    return 0
  fi

  echo "red"
}
