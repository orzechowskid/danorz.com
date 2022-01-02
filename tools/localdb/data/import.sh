#!/bin/bash

for i in *.bson; do
    mongorestore --uri mongodb://localhost:27017/alewife-cms $i
done
