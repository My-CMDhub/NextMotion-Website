#!/bin/bash

echo "📦 Preparing SolarSaver for ThemeForest Submission..."

# Define names
SOURCE_DIR="."
DIST_DIR="Submission_Package"
ZIP_NAME="SolarSaver-Source.zip"

# Create Dist Directory
mkdir -p "$DIST_DIR"

# Clean up previous builds
echo "🧹 Cleaning main project..."
rm -rf .next
rm -rf node_modules
rm -rf .git

# Create Source Zip (Excluding unnecessary files)
echo "🤐 Zipping source code..."
zip -r "$DIST_DIR/$ZIP_NAME" . -x "$DIST_DIR/*" -x "prepare_submission.sh" -x ".DS_Store" -x "documentation.html" -x ".gitignore"

# Copy Documentation
echo "📄 Copying documentation..."
cp documentation.html "$DIST_DIR/"

echo "✅ DONE!"
echo "---------------------------------------------------------"
echo "Your submission files are in the '$DIST_DIR' folder:"
echo "1. $ZIP_NAME (Upload this as 'Main File')"
echo "2. documentation.html (Included inside, but good to have separate)"
echo "---------------------------------------------------------"
