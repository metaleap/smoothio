#!/bin/bash
rm -f -r ../Dropbox/smoothio/*
cp -r -f * ../Dropbox/smoothio/
rm -f -r ../Dropbox/smoothio/_core/bin/linux/*
rm -f -r ../Dropbox/smoothio/_core/bin/osx/*
rm -f -r ../Dropbox/smoothio/_core/bin/osx/._*
rm -f -r ../Dropbox/smoothio/_core/bin/windows/*
rm -f -r ../Dropbox/smoothio/default/server/dbs/*
rm -f -r ../Dropbox/smoothio/_misc/nodesetup/tmp/*

rm -f -r ../gits/smoothio/*
cp -r -f * ../gits/smoothio/
rm -f -r ../gits/smoothio/_core/bin/linux/*
rm -f -r ../gits/smoothio/_core/bin/osx/*
rm -f -r ../gits/smoothio/_core/bin/osx/._*
rm -f -r ../gits/smoothio/_core/bin/windows/*
rm -f -r ../gits/smoothio/default/server/dbs/*
rm -f -r ../gits/smoothio/_misc/nodesetup/tmp/*

