#!/bin/sh

DIST_DIR=dist

rm -rf $DIST_DIR
mkdir $DIST_DIR
cp -r src bin $DIST_DIR
