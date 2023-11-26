#!/bin/bash

git filter-branch --env-filter '

# Function to change date
change_date() {
    OLD_DATE=$1
    NEW_DATE=$2
    DATE_TO_CHECK=$3

    # Extract just the date part (Year-Month-Day)
    COMMIT_DATE=$(echo $DATE_TO_CHECK | cut -d" " -f2,3,4)

    # Check if the commit date is the old date
    if [ "$COMMIT_DATE" = "$OLD_DATE" ]; then
        # Change the date
        NEW_FORMATTED_DATE="$NEW_DATE ${DATE_TO_CHECK:11}"
        echo $NEW_FORMATTED_DATE
    else
        echo $DATE_TO_CHECK
    fi
}

# Define the old and new dates
OLD_DATE1="Oct 6 2023"
NEW_DATE1="Nov 24 2023"
OLD_DATE2="Oct 7 2023"
NEW_DATE2="Nov 23 2023"
OLD_DATE3="Oct 8 2023"
NEW_DATE3="Nov 26 2023"

export GIT_COMMITTER_DATE=$(change_date "$OLD_DATE1" "$NEW_DATE1" "$GIT_COMMITTER_DATE")
export GIT_COMMITTER_DATE=$(change_date "$OLD_DATE2" "$NEW_DATE2" "$GIT_COMMITTER_DATE")
export GIT_COMMITTER_DATE=$(change_date "$OLD_DATE3" "$NEW_DATE3" "$GIT_COMMITTER_DATE")

export GIT_AUTHOR_DATE=$(change_date "$OLD_DATE1" "$NEW_DATE1" "$GIT_AUTHOR_DATE")
export GIT_AUTHOR_DATE=$(change_date "$OLD_DATE2" "$NEW_DATE2" "$GIT_AUTHOR_DATE")
export GIT_AUTHOR_DATE=$(change_date "$OLD_DATE3" "$NEW_DATE3" "$GIT_AUTHOR_DATE")

' --tag-name-filter cat -- --branches --tags
