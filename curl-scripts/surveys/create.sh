#!/bin/bash

API="http://localhost:4741"
URL_PATH="/surveys"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "survey": {
      "title": "'"${TITLE}"'",
      "description": "'"${DES}"'",
      "surveyQuestions": {
        "que": "'"${QUE}"'",
        "ans1": "'"${ANS1}"'",
        "ans2": "'"${ANS2}"'"
      }
    }
  }'

echo
